# Recipes postgres app
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=docker,py,fastapi,postgres,vite,react" />
  </a>
</p>

Project for "Databases" course at the University of Warsaw.

## [Live demo](https://recipe-app-static-frontend-jutkuzvhoq-lm.a.run.app)

- [Frontend](https://recipe-app-static-frontend-jutkuzvhoq-lm.a.run.app)
- [Backend docs](https://recipe-app-backend-jutkuzvhoq-lm.a.run.app/docs)

## Deployment

Project is fully dockerized and deployed. Frontend and backend is deployed on [Google Cloud Run](https://cloud.google.com/run). One of the benefits of using Cloud Run is that it offers a pay-per-use pricing model, which means that you are only charged for the number of requests your application receives. Database is deployed on [Fly Postgres](https://fly.io/docs/postgres/), which offers free quota for small projects.

## Running locally

### Prerequisites

-   [Docker](https://docs.docker.com/install/)
-   [Node.js](https://nodejs.org/en/download/)

### Running

1.  Clone the repository
2.  Run `docker compose up` in the root directory
3.  Backend will be available at `localhost:8000`, frontend at `localhost:3000`.

## Project structure

```bash
.
├── backend         # Backend code
├── database        # Database configuration and data source
├── docker-compose.yml  # Docker compose configuration
├── docs            # Backend documentation (sql models, etc.)
├── .env            # Environment variables for docker compose for postgres db and backend
├── frontend        # Frontend code
└── README.md
```