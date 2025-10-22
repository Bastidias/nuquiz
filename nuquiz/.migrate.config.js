require('dotenv').config();

const isTest = process.env.NODE_ENV === 'test';
const databaseUrl = isTest
  ? process.env.TEST_DATABASE_URL
  : process.env.DATABASE_URL;

module.exports = {
  databaseUrl,
  migrationsTable: 'pgmigrations',
  dir: 'migrations',
  direction: 'up',
  count: Infinity,
  createSchema: true,
  createMigrationsSchema: false,
  schema: 'public',
};
