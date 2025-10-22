/**
 * Jest Setup - Test Database Configuration
 *
 * NO MOCKS ALLOWED - We test against real test database
 */

// Set test environment before any imports
process.env.NODE_ENV = 'test';

// Ensure test database URL is set
if (!process.env.TEST_DATABASE_URL) {
  throw new Error(
    'TEST_DATABASE_URL must be set in .env file for running tests'
  );
}

// Global test timeout (can be overridden per test)
jest.setTimeout(10000);

// Uncomment for verbose database query logging during tests
// process.env.DEBUG = 'pg:*';

console.log('✓ Jest setup complete - using test database on port 5433');
console.log('✓ NO MOCKS - Testing against real PostgreSQL instance');
