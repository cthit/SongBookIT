from pony.orm import db_session

from utils.ResultWithData import ResultWithData, get_result_with_data
from db import Song
from objects.requestobjects.RequestSongObject import RequestSongObject
from utils.ShortUnique import short_unique_id


@db_session
def create_song(song: RequestSongObject) -> ResultWithData[str]:
    song_id = short_unique_id()
    song_created = Song(song_id=song_id, title=song.title, melody=song.melody, author=song.author, text=song.text)
    return get_result_with_data(song_created.song_id)


@db_session
def update_song(song: RequestSongObject) -> ResultWithData:
    song = Song[song.song_id]
    song.set(title=song.title, melody=song.melody, author=song.author, text=song.text)
    return get_result_with_data({})


@db_session
def remove_song(song_id: str) -> ResultWithData:
    Song.get(song_id=song_id).delete()
    return get_result_with_data({})
