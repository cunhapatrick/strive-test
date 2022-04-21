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

## Testing Application on playground

- Run `yarn start` and visit `http://localhost:3333/graphql` to ensure the server is running

## Add a player on database
- On playground, run this code:

```
  mutation {
    addPlayer(newPlayerData: {
      name: "name of the player",
      jerseyNumber: "any number or null",
      birthDate: "any date or null"
    }) {
      playerId,
      name,
			jerseyNumber,
			birthDate
    }
  }
```
as a reminder, both jerseyNumber and birthDate are optional data, the only required field to create the player is it's name.

## Get a player object
- On playground, run this code:

```
  {
    player {
      playerId,
      name,
			jerseyNumber,
			birthDate
    }
  }
```
## Note to test on playground
- The project has a migration but doesn't have seeds, so in order to test the "happy route" first run a mutation request to insert a player on the database then request a query to get the player data;
- To test the exception, try to find

# Unit Tests
- Run `yarn test` to start the unit tests.

## Integration Tests
- Run `yarn test:e2e` to start the integration tests to ensure the function of the database and the graphql system;

## Notes about improvements
- The birthDate was changed to string just for display because typeorm returns a string instead of a date object.
- The global exception filters will provide a centralized treatment for the general exceptions that we will eventually get over the time.
- The integration tests implemented on the project will ensure that the database and the graphql system are working properly together to create and to search for the players.
