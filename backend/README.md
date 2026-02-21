# Backend

## Setup and Start
- `cd backend`
- `npm install`
- Create .env:
    - `DATABASE_URL=postgres://dev:devpass@localhost:5432/map` 
    - `PORT=4000`

- `docker compose up -d`
- `psql $DATABASE_URL -f src/migrations/init.sql`
- `psql $DATABASE_URL -f src/migrations/test.sql`
- `npm run build`
- `npm run dev`
- `npm run start`

## Check Status: 
- `curl http://localhost:4000/health`

## Check Building Data: 
- `curl http://localhost:4000/buildings`

## Stop Database: 
- `docker compose down`
