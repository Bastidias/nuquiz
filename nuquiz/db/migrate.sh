#!/bin/bash

# Database Migration Script
# Runs SQL migrations against PostgreSQL database

set -e  # Exit on error

# Load environment variables
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Determine which database to use
if [ "$NODE_ENV" = "test" ]; then
    DB_URL="$TEST_DATABASE_URL"
    echo "🧪 Running migrations on TEST database (port 5433)"
else
    DB_URL="$DATABASE_URL"
    echo "🚀 Running migrations on DEV database (port 5432)"
fi

# Check if database URL is set
if [ -z "$DB_URL" ]; then
    echo "❌ Error: Database URL not set"
    echo "Please set DATABASE_URL or TEST_DATABASE_URL in .env file"
    exit 1
fi

# Extract connection details from URL
# Format: postgresql://user:password@host:port/database
DB_USER=$(echo $DB_URL | sed -n 's/.*:\/\/\([^:]*\):.*/\1/p')
DB_PASS=$(echo $DB_URL | sed -n 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/p')
DB_HOST=$(echo $DB_URL | sed -n 's/.*@\([^:]*\):.*/\1/p')
DB_PORT=$(echo $DB_URL | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
DB_NAME=$(echo $DB_URL | sed -n 's/.*\/\(.*\)/\1/p')

echo "📊 Database: $DB_NAME"
echo "🏠 Host: $DB_HOST:$DB_PORT"
echo "👤 User: $DB_USER"
echo ""

# Run all migrations in order
MIGRATION_DIR="db/migrations"
MIGRATION_COUNT=0

for migration in $(ls -1 $MIGRATION_DIR/*.sql | sort); do
    MIGRATION_NAME=$(basename $migration)
    echo "⚡ Running migration: $MIGRATION_NAME"

    PGPASSWORD=$DB_PASS psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f $migration

    if [ $? -eq 0 ]; then
        echo "✅ $MIGRATION_NAME completed successfully"
        MIGRATION_COUNT=$((MIGRATION_COUNT + 1))
    else
        echo "❌ $MIGRATION_NAME failed"
        exit 1
    fi
    echo ""
done

echo "🎉 All migrations completed successfully!"
echo "📈 Total migrations run: $MIGRATION_COUNT"
