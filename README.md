# DanceUP

## Clone the repo

```bash
git clone git@github.com:rastian/dance-up.git
```

## Install Dependencies

Use NPM to install dependencies

```bash
cd backend/
npm install
```

## Running Docker Containers
1) Install [Docker Desktop](https://www.docker.com/get-started/)
2) Copy `.env.example` as `.env` and replace `PGUSER` & 
`PGPASSWORD` values with your own values
3) Open terminal and build container

```bash
# Change to project directory
cd path/to/dance-up
# Build Docker Container
docker-compose up --build -d
# Verify if container is running: pg_db
docker ps
```
