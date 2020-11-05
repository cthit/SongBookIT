
wait_for_postgres() (
    first_iteration=true
    while ! pg_isready -h "$SONGBOOKIT_POSTGRES_HOST" -p "$SONGBOOKIT_POSTGRES_PORT" -q; do
        if [ -n "$first_iteration" ]; then
            printf "Waiting for db \"postgresql://%s@%s:%s\"" "$SONGBOOKIT_POSTGRES_USER" "$SONGBOOKIT_POSTGRES_HOST" "$SONGBOOKIT_POSTGRES_PORT"
            unset first_iteration
        else
            printf "."
        fi

        sleep 1
    done
    if [ -z "$first_iteration" ]; then echo; fi
)

wait_for_postgres
python -u src/app.py