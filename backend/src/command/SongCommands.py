from pony.orm import db_session, select

from utils.ResultWithData import ResultWithData, get_result_with_data
from db import Song
from objects.requestobjects.RequestSongObject import RequestSongObject
from utils.ShortUnique import short_unique_id


@db_session
def create_song(song: RequestSongObject) -> ResultWithData[str]:
    song_id = short_unique_id()
    song_numbers = list(select(s.number for s in Song))
    if song_numbers:
        highest_song_nbr = max(song_numbers) + 1
    else:
        highest_song_nbr = 1
    song_created = Song(
        song_id=song_id,
        number=highest_song_nbr,
        title=song.title,
        melody=song.melody,
        melody_link=song.melody_link,
        author=song.author,
        text=song.text
    )
    return get_result_with_data(song_created.song_id)


@db_session
def update_song(song: RequestSongObject) -> ResultWithData:
    db_song = Song[song.song_id]
    db_song.set(title=song.title, melody=song.melody, melody_link=song.melody_link, author=song.author, text=song.text)
    return get_result_with_data({})


@db_session
def remove_song(song_id: str) -> ResultWithData:
    Song.get(song_id=song_id).delete()
    return get_result_with_data({})
