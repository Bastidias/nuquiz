/**
 * Database Connection Module (Functional Style)
 *
 * Provides connection pooling and query utilities for PostgreSQL.
 * Uses composition and pure functions following Eric Elliott's functional approach.
 */

import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Connection pool configuration
interface PoolConfig {
  connectionString: string;
  max?: number;
  idleTimeoutMillis?: number;
  connectionTimeoutMillis?: number;
}

// Default pool configuration
const defaultPoolConfig: Pick<PoolConfig, 'max' | 'idleTimeoutMillis' | 'connectionTimeoutMillis'> = {
  max: 20, // maximum number of clients in the pool
  idleTimeoutMillis: 30000, // close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // return an error after 2 seconds if connection can't be established
};

// Development pool
let devPool: pg.Pool | null = null;

// Test pool
let testPool: pg.Pool | null = null;

/**
 * Get the appropriate connection string based on environment
 */
const getConnectionString = (): string => {
  const isTest = process.env.NODE_ENV === 'test';
  const connectionString = isTest
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      `Database connection string not found. Please set ${
        isTest ? 'TEST_DATABASE_URL' : 'DATABASE_URL'
      } in your .env file.`
    );
  }

  return connectionString;
};

/**
 * Create a new connection pool
 */
const createPool = (config: PoolConfig): pg.Pool => {
  return new Pool({
    ...defaultPoolConfig,
    ...config,
  });
};

/**
 * Get or create the connection pool (singleton pattern)
 */
export const getPool = (): pg.Pool => {
  const isTest = process.env.NODE_ENV === 'test';
  const pool = isTest ? testPool : devPool;

  if (pool) {
    return pool;
  }

  const connectionString = getConnectionString();
  const newPool = createPool({ connectionString });

  if (isTest) {
    testPool = newPool;
  } else {
    devPool = newPool;
  }

  return newPool;
};

/**
 * Query result type
 */
export interface QueryResult<T = any> {
  rows: T[];
  rowCount: number;
  command: string;
}

/**
 * Execute a SQL query (pure function interface)
 *
 * @param text - SQL query string
 * @param params - Query parameters
 * @returns Promise with query results
 */
export const query = async <T = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> => {
  const pool = getPool();

  try {
    const result = await pool.query<T>(text, params);
    return {
      rows: result.rows,
      rowCount: result.rowCount || 0,
      command: result.command,
    };
  } catch (error) {
    // Log error but let it bubble up for handling
    console.error('Database query error:', error);
    throw error;
  }
};

/**
 * Execute a single query and return first row or null
 */
export const queryOne = async <T = any>(
  text: string,
  params?: any[]
): Promise<T | null> => {
  const result = await query<T>(text, params);
  return result.rows[0] || null;
};

/**
 * Execute a query and return all rows
 */
export const queryMany = async <T = any>(
  text: string,
  params?: any[]
): Promise<T[]> => {
  const result = await query<T>(text, params);
  return result.rows;
};

/**
 * Transaction function type
 */
type TransactionCallback<T> = (client: pg.PoolClient) => Promise<T>;

/**
 * Execute a function within a database transaction
 *
 * @param callback - Function to execute within transaction
 * @returns Promise with callback result
 */
export const transaction = async <T>(
  callback: TransactionCallback<T>
): Promise<T> => {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Close all database connections
 * Should be called when shutting down the application
 */
export const closeAll = async (): Promise<void> => {
  const pools = [devPool, testPool].filter(Boolean) as pg.Pool[];

  await Promise.all(
    pools.map(pool => pool.end())
  );

  devPool = null;
  testPool = null;
};

/**
 * Check if database connection is healthy
 */
export const healthCheck = async (): Promise<boolean> => {
  try {
    await query('SELECT 1');
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
};

/**
 * Get current pool statistics
 */
export const getPoolStats = () => {
  const pool = getPool();
  return {
    total: pool.totalCount,
    idle: pool.idleCount,
    waiting: pool.waitingCount,
  };
};
