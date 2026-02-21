

# start DB + api via docker-compose
docker compose up --build
# in another shell (or inside container) run migrations:
psql $DATABASE_URL -f src/migrations/001_init.sql
psql $DATABASE_URL -f src/migrations/002_seed.sql
# start the API locally (dev)
npm run start
# healthcheck: curl http://localhost:4000/health
