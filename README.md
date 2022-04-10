# Strive BE-HW

As a exercise of your excellent skills, we would like you to implement a backend graphql Create and Get route.

Clean architecture should be strived for. A nestjs backend and docker image of the database is provided, along with run scripts. However, you may use any nodejs typescript stack to complete the task as long as it uses a graphql api and connects to a postgres database.

### User Story

As a user I want to create a player

### Acceptance Criteria

- Route that creates a player in a backend database with a required name, an optional jersey number and an optional birth date
- Route to get player by playerId assigned by the database
- Typescript and postgres must be used (docker image for database and connection string provided)
- Includes migration script for the database

### Out of scope

- Any frontend code

# Getting Started

- Install docker https://docs.docker.com/engine/install/
- Start the db server with `docker run -d --name timescaledb -p 5432:5432 -e POSTGRES_PASSWORD=password timescale/timescaledb:2.0.0-pg12` This starts a timescaledb server on port 5432 with username `postgres` and password `password`
- Install `node 14.x.x` and `yarn`
- Run `yarn` to install npm dependencies
- Run `yarn db:init` to migrate the database, this will create the `strive-hw` database on the db where you can create tables. The connection string is in the `.env` file

## If using nestjs

- Run `yarn start` and visit `http://localhost:3333/graphql` to ensure the server is running
- Run a simple test query in the graphql playground. This is an easy way to manually test your routes. The query (with codefirst schema) is defined in the `example.resolver.ts`. Codefirst is not a requirement, feel free to change to schema first if you wish!

```
  query test {
    test {
      example
    }
  }
```

## If NOT using nestjs

- It is 100% OK, trying to pick up a new framework for a HW assignment is definitely a challenge
- I suggest deleting everything in `./src` and getting started with a `main.ts` type file as an entrypoint to the api server.


# Future Improvements
- Fix birthDate type from string to date;
- Implement global exception treatments;
- Implement integration tests for postgres;
