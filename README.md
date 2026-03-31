# Gator Direct
Campus navigation at the University of Florida can be challenging. Gator Direct is a comprehensive tool for both indoor and outdoor navigation at UF. Through this application's use of location tracking and detailed maps, students, staff, and guests are able to guide themselves to specific locations effortlessly.

## Requirements:
 - Node.js
 - npm
 - Docker: [Install Docker](https://www.docker.com/get-started/)
 - Docker Compose

## To Run: 
### Start Back End:
1. Go to backend directory: `cd backend`
2. Install requirements: `npm install`
3. Create .env file in the backend folder with the following content: 
    - `DATABASE_URL=postgres://dev:devpass@localhost:5432/map`
    - `PORT=4000`
4. Start Docker: `docker compose up -d --build`
5. Initialize the database: 
    - MacOS/Linux: `docker exec -i $(docker ps -qf "name=db") \ psql -U dev -d map < src/migrations/init.sql`
    - Windows: `cat src/migrations/init.sql | docker exec -i $(docker ps -qf 'name=db') psql -U dev -d map`
6. Optionally, check the backend is functional: `curl http://localhost:4000/health`  

### Start Front End: 
1. Go to frontend directory: `cd frontend`
2. Start frontend: `npm start`

## To Stop: 
### Stop backend: 
- `docker compose down`

### Stop frontend: 
- Use `Ctrl + C`
