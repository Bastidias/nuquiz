#!/bin/bash

# Reset Test Database Script
# Drops all tables and re-runs migrations (use when schema changes)

set -e

CONTAINER="nuquiz-postgres-test"
DB_NAME="nuquiz_test"
DB_USER="nuquiz_user"

echo "🔥 FULL RESET: Dropping all tables and recreating schema..."
echo "⚠️  This will DELETE ALL DATA in the test database!"
echo ""

# Drop all tables
echo "1. Dropping all tables..."
docker exec -i $CONTAINER psql -U $DB_USER -d $DB_NAME << 'EOF'
DROP TABLE IF EXISTS analytics_events CASCADE;
DROP TABLE IF EXISTS user_knowledge_progress CASCADE;
DROP TABLE IF EXISTS answer_option_components CASCADE;
DROP TABLE IF EXISTS answer_options CASCADE;
DROP TABLE IF EXISTS question_knowledge_sources CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS quiz_sessions CASCADE;
DROP TABLE IF EXISTS knowledge CASCADE;
DROP TABLE IF EXISTS user_pack_subscriptions CASCADE;
DROP TABLE IF EXISTS content_packs CASCADE;
DROP TABLE IF EXISTS users CASCADE;
EOF

if [ $? -eq 0 ]; then
    echo "✅ All tables dropped"
else
    echo "❌ Failed to drop tables"
    exit 1
fi

echo ""
echo "2. Running migrations..."
NODE_ENV=test ./db/migrate-docker.sh

echo ""
echo "🎉 Test database reset complete!"
echo "Database is empty and ready for testing"
