from uuid import UUID

from pony.orm import Database, Required, PrimaryKey, Set, Optional

import config

db = Database()


class Song(db.Entity):
    song_id = PrimaryKey(UUID, auto=True)
    title = Required(str)
    melody = Optional(str)
    text = Required(str)
    author = Required(str)
    tags = Set("Tag")


class Tag(db.Entity):
    tag_id = PrimaryKey(UUID, auto=True)
    name = Required(str)
    pretty_name_sv = Required(str)
    pretty_name_en = Required(str)
    songs = Set(Song)


db.bind(
    provider='postgres',
    user=config.POSTGRES_USER,
    password=config.POSTGRES_PASSWORD,
    host=config.POSTGRES_HOST,
    port=config.POSTGRES_PORT,
    database=config.POSTGRES_DB
)
db.generate_mapping(create_tables=True)
