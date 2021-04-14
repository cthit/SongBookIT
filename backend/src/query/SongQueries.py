from typing import List

from pony.orm import db_session

from utils.ErrorCodes import SONG_TITLE_NOT_EXIST, SONG_ID_NOT_EXIST
from utils.ResultWithData import ResultWithData, get_result_with_error, get_result_with_data
from objects.dataobject.SongObject import SongObject
from db import Song


@db_session
def get_songs() -> List[SongObject]:
    songs = Song.select(lambda t: True)
    return [db_song_to_song_object(song) for song in songs]


@db_session
def get_songs_by_ids(ids: List[str]) -> List[SongObject]:
    songs = Song.select(lambda s: s.song_id in ids)
    return [db_song_to_song_object(song) for song in songs]


@db_session
def get_song_by_id(song_id: str) -> ResultWithData[SongObject]:
    song = Song.get(song_id=song_id)
    if song is None:
        return get_result_with_error(SONG_ID_NOT_EXIST)
    else:
        return get_result_with_data(db_song_to_song_object(song))


@db_session
def get_song_by_title(title: str) -> ResultWithData[SongObject]:
    song = Song.get(title=title)
    if song is None:
        return get_result_with_error(SONG_TITLE_NOT_EXIST)
    else:
        return get_result_with_data(db_song_to_song_object(song))

@db_session
def db_song_to_song_object(song: Song, favourite=False) -> SongObject:
    return SongObject(
        song_id=song.song_id,
        favourite=favourite,
        number=song.number,
        title=song.title,
        melody=song.melody,
        melody_link=song.melody_link,
        author=song.author,
        text=song.text,
        tags=[song_to_tag.tag.tag_id for song_to_tag in song.song_tags]
    )
