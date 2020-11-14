from typing import List
from uuid import UUID

from pony.orm import db_session

from ResultWithData import ResultWithData, get_result_with_error, get_result_with_data
from objects.dataobject.SongObject import SongObject
from db import Song


@db_session
def get_songs_db() -> List[SongObject]:
    songs = Song.select(lambda t: True)
    return [db_song_to_song_object(song) for song in songs]


@db_session
def get_song_db(song_id: UUID) -> ResultWithData[SongObject]:
    song = Song.get(song_id=song_id)
    if song is None:
        return get_result_with_error(f"The song with id={song_id} does not exist")
    else:
        return get_result_with_data(db_song_to_song_object(song))


@db_session
def get_song_by_name_db(title: str) -> ResultWithData[SongObject]:
    song = Song.get(title=title)
    if song is None:
        return get_result_with_error(f"The song with title={title} does not exist")
    else:
        return get_result_with_data(db_song_to_song_object(song))


@db_session
def db_song_to_song_object(song: Song) -> SongObject:
    return SongObject(
        song_id=song.song_id,
        title=song.title,
        melody=song.melody,
        author=song.author,
        text=song.text,
        tags=[song_to_tag.tag.tag_id for song_to_tag in song.song_tags]
    )
