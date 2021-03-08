# [songbook.chalmers.it](https://songbook.chalmers.it)

The digital songbook of the software engineering student division with all the songs you've come to love.

## Development

The easiest way to get started is via docker!

`docker-compose up --build`

`docker-compose.yml` sets up the following dependencies:

* Frontend and backend with hot reloading support.
* Postgres database for the backend.
* The frontend, backend, a database, and a Redis instance for [Gamma](https://github.com/cthit/gamma).

### Adding mocking data

In `App.py` in the backend the function `setup_db.py` is used to reset, create and populate the database with mockingdata. It is controlled by the boolean passed to it.

### Adding or updating dependencies

Docker can be unforgiving when trying to update dependencies.

* Start with updating your dependencies in one of the package.json, either the one for the frontend or the one for the backend.
* Run `yarn install`.
* Run `docker-compose rm`. This will remove your volumes and any previously saved data.
* Run `docker-compose build --force-rm --no-cache songbook-frontend`

After that, you can just run `docker-compose up` to get started again.

## Deployment

What's needed to run songbook in production is:

- Frontend
- Backend
- PostgreSQL database
- Reverse proxy (to run the frontend and backend from the same port)

### Database migration

Right now there's no migration script installed on songbook.chalmers.it. You'll have to do it manually. Just don't forget to make a backup before starting. In the future, there should be SQL files for migration in `/database/migration`.

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
