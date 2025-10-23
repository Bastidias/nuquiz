#!/bin/bash

# Load Sample Data Script
# Loads States of Matter sample data into database

set -e

# Determine which database to use
if [ "$NODE_ENV" = "test" ]; then
    CONTAINER="nuquiz-postgres-test"
    DB_NAME="nuquiz_test"
    DB_USER="nuquiz_user"
    echo "🧪 Loading sample data into TEST database"
else
    CONTAINER="nuquiz-postgres-dev"
    DB_NAME="nuquiz_dev"
    DB_USER="nuquiz_user"
    echo "🚀 Loading sample data into DEV database"
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

echo "📥 Loading sample data..."
docker exec -i $CONTAINER psql -U $DB_USER -d $DB_NAME < db/sample-data.sql

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Sample data loaded successfully!"
    echo ""
    echo "📚 Available content:"
    echo "   - States of Matter (Solid, Liquid, Gas, Plasma)"
    echo "   - Water Cycle (Evaporation, Condensation, Precipitation)"
    echo ""
    echo "🎯 Example quiz questions:"
    echo "   - 'Select all examples of a solid'"
    echo "   - 'Which properties describe particle movement in liquids?'"
    echo "   - 'What processes occur during evaporation?'"
    echo ""
    echo "💡 Try querying the data:"
    echo "   docker exec -it $CONTAINER psql -U $DB_USER -d $DB_NAME"
    echo "   SELECT * FROM knowledge WHERE type = 'category';"
else
    echo "❌ Failed to load sample data"
    exit 1
fi
