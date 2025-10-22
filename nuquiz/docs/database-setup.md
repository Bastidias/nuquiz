# Database Setup Guide

## Quick Start

### 1. Start PostgreSQL Instances

```bash
# Start both dev and test databases
docker-compose up -d

# Check they're running
docker-compose ps

# View logs
docker-compose logs -f postgres-dev
docker-compose logs -f postgres-test
```

### 2. Set Up Environment Variables

```bash
# Copy environment template
cp .env.example .env

# Edit .env if needed (default values work for local development)
```

### 3. Verify Connections

```bash
# Connect to dev database
psql postgresql://nuquiz_user:nuquiz_dev_password@localhost:5432/nuquiz_dev

# Connect to test database
psql postgresql://nuquiz_user:nuquiz_test_password@localhost:5433/nuquiz_test
```

## Docker Commands

### Starting & Stopping

```bash
# Start databases
docker-compose up -d

# Stop databases (keeps data)
docker-compose stop

# Stop and remove containers (keeps data in volumes)
docker-compose down

# Stop and remove everything including data (⚠️ destructive)
docker-compose down -v
```

### Health Checks

```bash
# Check if databases are healthy
docker-compose ps

# Both should show "healthy" status
```

### Logs

```bash
# Follow logs for both databases
docker-compose logs -f

# Logs for specific database
docker-compose logs -f postgres-dev
docker-compose logs -f postgres-test
```

## Database Access

### Development Database

- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `nuquiz_dev`
- **User**: `nuquiz_user`
- **Password**: `nuquiz_dev_password`

### Test Database

- **Host**: `localhost`
- **Port**: `5433` (different port to avoid conflicts)
- **Database**: `nuquiz_test`
- **User**: `nuquiz_user`
- **Password**: `nuquiz_test_password`

## Why Two Databases?

**Separation of Concerns:**
- **Dev database** - for manual testing, exploring data, running the app
- **Test database** - exclusively for automated tests, gets cleaned between test runs

**Benefits:**
- Tests don't pollute your development data
- Can reset test database without losing dev work
- Safer to run destructive test operations

## Troubleshooting

### Port Already in Use

If port 5432 or 5433 is already in use:

```bash
# Find what's using the port (Linux/Mac)
lsof -i :5432
lsof -i :5433

# Or on Linux
sudo netstat -tulpn | grep 5432
```

**Solution**: Either stop the conflicting service or change ports in `docker-compose.yml`.

### Connection Refused

```bash
# Check if containers are running
docker-compose ps

# If not healthy, check logs
docker-compose logs postgres-dev
docker-compose logs postgres-test

# Restart
docker-compose restart
```

### Reset Everything

```bash
# Stop and remove all data (⚠️ you'll lose everything)
docker-compose down -v

# Start fresh
docker-compose up -d

# Run migrations again (when migration system is set up)
npm run migrate
```

## Next Steps

1. ✅ Docker setup complete
2. ⏭️ Set up migration system (see migrations in `docs/database.sql`)
3. ⏭️ Configure Jest to use test database
4. ⏭️ Build data access layer
