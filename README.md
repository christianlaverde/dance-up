# DanceUp

DanceUp is a cloud-based dance studio management platform designed to streamline class scheduling, membership tracking, student check-ins, and payments.

🚧 Project Status: This project is currently in development. 

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express, TypeScript (in progress)
- **Frontend:** React (in progress)
- **Database:** PostgreSQL (via Docker)
- **Testing:** Jest
- **Containerization:** Docker, Docker Compose

## 🛠️ Setup Instructions

### Clone the repo

```bash
git clone git@github.com:christianlaverde/dance-up.git
```

### Install Dependencies

Use `npm` to install dependencies

```bash
# Change to project backend dir (replace `path/to` with the actual path on 
# your machine, e.g. ~/projects/dance-up)
cd path/to/dance-up/backend/
# Install backend dependencies using npm
npm install
# Change to project frontend dir
cd path/to/dance-up/frontend/
# Install frontend dependencies using npm
npm install
```

### Setting up Development Environment
1) Copy `.env.example` as `.env` and replace the following values with your own:
    - `PGPASSWORD`
    - `SESSION_SECRET`
2) Install [Docker Desktop](https://www.docker.com/get-started/)
3) Build Container

```bash
# Change to project directory
cd path/to/dance-up
# Build Docker Container
docker-compose up --build -d
# Verify if container is running: pg_db
docker ps
```

### Run Development Environment

1) Run Tests
```bash
# Will run tests as relevant files are changed
# See path/to/dance-up/backend/package.json
npm run test
```

2) Run Build
```bash
# Will compile .ts files and alert of any compilation errors
# See path/to/dance-up/backend/package.json
npm run build
```

3) Run Application Backend Server
```bash
# Will run backend server on localhost:3000 and reset when re-compiled
# See path/to/dance-up/backend/package.json
npm run dev
```
