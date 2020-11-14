from uuid import UUID

from pony.orm import db_session, delete

from ResultWithData import ResultWithData, get_result_with_data
from db import Song
from objects.requestobjects.RequestSongObject import RequestSongObject


@db_session
def create_song_db(song: RequestSongObject) -> ResultWithData[UUID]:
    song_created = Song(title=song.title, melody=song.melody, author=song.author, text=song.text)
    return get_result_with_data(song_created.song_id)


@db_session
def update_song_db(song: RequestSongObject) -> ResultWithData:
    song = Song[song.song_id]
    song.set(title=song.title, melody=song.melody, author=song.author, text=song.text)
    return get_result_with_data({})


@db_session
def remove_song_db(song_id: UUID) -> ResultWithData:
    Song.get(song_id=song_id).delete()
    return get_result_with_data({})
