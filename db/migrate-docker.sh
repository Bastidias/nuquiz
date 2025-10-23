#!/bin/bash

# Docker-based Database Migration Script
# Uses docker exec to run migrations (no local psql required)

set -e  # Exit on error

# Determine which database to use
if [ "$NODE_ENV" = "test" ]; then
    CONTAINER="nuquiz-postgres-test"
    DB_NAME="nuquiz_test"
    DB_USER="nuquiz_user"
    echo "🧪 Running migrations on TEST database (container: $CONTAINER)"
else
    CONTAINER="nuquiz-postgres-dev"
    DB_NAME="nuquiz_dev"
    DB_USER="nuquiz_user"
    echo "🚀 Running migrations on DEV database (container: $CONTAINER)"
fi

# Check if container is running
if ! docker ps | grep -q $CONTAINER; then
    echo "❌ Error: Container $CONTAINER is not running"
    echo "Start it with: docker-compose up -d"
    exit 1
fi

echo "📊 Database: $DB_NAME"
echo "🐳 Container: $CONTAINER"
echo ""

# Run all migrations in order
MIGRATION_DIR="db/migrations"
MIGRATION_COUNT=0

for migration in $(ls -1 $MIGRATION_DIR/*.sql | sort); do
    MIGRATION_NAME=$(basename $migration)
    echo "⚡ Running migration: $MIGRATION_NAME"

    docker exec -i $CONTAINER psql -U $DB_USER -d $DB_NAME < $migration

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
