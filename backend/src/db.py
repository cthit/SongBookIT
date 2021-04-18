from uuid import UUID

from pony.orm import Database, Required, PrimaryKey, Set, Optional, db_session
from config import db_config as config

db = Database()


class Song(db.Entity):
    song_id = PrimaryKey(str)
    number = Required(int, unique=True)
    title = Required(str, unique=True)
    author = Optional(str)
    melody = Optional(str)
    melody_link = Optional(str)
    text = Required(str)
    song_tags = Set("SongToTag")
    favorites = Set("FavoriteSong")


class Tag(db.Entity):
    tag_id = PrimaryKey(str)
    name = Required(str, unique=True)
    pretty_name_sv = Required(str)
    pretty_name_en = Required(str)
    song_tags = Set("SongToTag")


class SongToTag(db.Entity):
    song = Required(Song)
    tag = Required(Tag)
    PrimaryKey(song, tag)


class FavoriteSong(db.Entity):
    user_name = Required(str)
    song = Required(Song)
    PrimaryKey(user_name, song)


db.bind(
    provider='postgres',
    user=config.POSTGRES_USER,
    password=config.POSTGRES_PASSWORD,
    host=config.POSTGRES_HOST,
    port=config.POSTGRES_PORT,
    database=config.POSTGRES_DB
)


@db_session
def reset_db():
    print("!!!Resetting db!!!")
    db.execute("DROP SCHEMA public CASCADE;")
    db.execute("CREATE SCHEMA public;")


def create_db():
    print(" ========== Creating Database ========== ")
    db.generate_mapping(create_tables=True)

