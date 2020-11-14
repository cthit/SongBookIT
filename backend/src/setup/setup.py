from pony.orm import db_session

from db import db, create_db
from src.setup.md.md_to_db import add_songs_from_md


@db_session
def reset_db():
    print("!!!Resetting db!!!")
    db.execute("DROP SCHEMA public CASCADE;")
    db.execute("CREATE SCHEMA public;")


def setup_db(reset: bool):
    if reset:
        reset_db()
        create_db()
        add_songs_from_md()