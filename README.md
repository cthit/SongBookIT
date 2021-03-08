# [songbook.chalmers.it](https://songbook.chalmers.it)

The digital songbook of the software engineering student division with all the songs you've come to love.

## Development

The easiest way to get started is via docker with the backend running in an IDE!

### Docker-compose
`docker-compose up --build`

`docker-compose.yml` sets up the following dependencies:

* Frontend with hot reloading support.
* Postgres database for the backend.
* The frontend, backend, a database, and a Redis instance for [Gamma](https://github.com/cthit/gamma).

### Set up backend
For the backend to connect to the other dependencies, a proxy has to be set up. 
This value, `HTTP_PROXY` is specified in `frontend/.env.development` and should have the value of the Gateway address for the frontend's docker container.
It can be found by following the steps below.

* Run `docker-compose up`
* When all the containers are active, execute `docker ps`.
* Copy a Container ID for a container in the Songbook application. 
  There should be a several containers listed in table, any of which can be used. 
* Execute `docker inspect <Contianer ID> | grep "Gateway":`
* The address/es found is the value of you `HTTP_PROXY`

### Adding mocking data

In `backend/src/App.py` the function `setup_db(bool)` is used to reset, create and populate the database with mocking data.
It is controlled by the boolean passed to it.

### Adding or updating dependencies

Docker can be unforgiving when trying to update dependencies.

* Start with updating your dependencies in one of the package.json, either the one for the frontend or the one for the backend.
* Run `yarn install`.
* Run `docker-compose rm`. This will remove your volumes and any previously saved data.
* Run `docker-compose build --force-rm --no-cache songbook_songbook-frontend_1`

After that, you can just run `docker-compose up` to get started again.

## Deployment
What's needed to run songbook in production is:

- Frontend
- Backend
- PostgreSQL database
- Reverse proxy (to run the frontend and backend from the same port)

### Database migration
Right now there's no migration script installed on songbook.chalmers.it.
You'll have to do it manually. Just don't forget to make a backup before starting.
In the future, there should be SQL files for migration in `/database/migration`.

### Environment variables

The frontend has as of right now the gamma URL hardcoded to https://gamma.chalmers.it.

## Production
Environment variables for the backend:

- `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_DB`, `POSTGRES_PASSWORD`: Connecting to a PostgreSQL database.

To add mock songs to DB, run the following command after docker-compose has finished building

#### Gamma properties
songbook.chalmers.it is designed with usage with Gamma. Note that the defaults are matched with the values in `docker-compose.yml` for ease to start developing locally.

- `GAMMA_SECRET`: Default `secret`.
- `GAMMA_ADMIN_AUTHORITY`: The name of the gamma authority. Default is `sexit`.
- `GAMMA_CLIENT_ID`, `GAMMA_CLIENT_SECRET`: Id and secret of the client from Gamma. Default is `id`/`secret`.
- `GAMMA_ME_URI`: Default `/users/me`.
- `GAMMA_TOKEN_URI`: Default `/oauth/token`.
- `GAMMA_AUTHORIZATION_URI`: Should be the full URL, probably: `https://songbook.chalmers.it/api/oauth/authorize`. Default: `http://localhost:8081/api/oauth/authorize`.
- `GAMMA_REDIRECT_URI`: Should as well be the full URL, probably: `https://gamma.chalmers.it/api/auth/account/callback`. Default `http://localhost:3001/auth/account/callback`.
