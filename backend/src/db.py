from uuid import UUID

from pony.orm import Database, Required, PrimaryKey, Set, Optional

from config import db_config as config

db = Database()


class Song(db.Entity):
    song_id = PrimaryKey(str)
    title = Required(str, unique=True)
    melody = Optional(str)
    text = Required(str)
    author = Required(str)
    song_tags = Set("SongToTag")


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


db.bind(
    provider='postgres',
    user=config.POSTGRES_USER,
    password=config.POSTGRES_PASSWORD,
    host=config.POSTGRES_HOST,
    port=config.POSTGRES_PORT,
    database=config.POSTGRES_DB
)


def create_db():
    print(" ========== Creating Database ========== ")
    db.create_tables()


db.generate_mapping(create_tables=True)
