from db import create_db, reset_db
from setup.md.md_to_db import add_songs_from_md


def setup_db(reset: bool):
    if reset:
        reset_db()
        create_db()
        add_songs_from_md()
    else:
        create_db()
