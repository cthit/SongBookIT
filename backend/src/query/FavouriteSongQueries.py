from typing import List

from pony.orm import db_session

from db import FavouriteSong
from objects.dataobject.SongObject import SongObject
from query.SongQueries import db_song_to_song_object
from utils.ErrorCodes import SONG_FAVOURITE_NOT_EXIST
from utils.ResultWithData import get_result_with_error, ResultWithData, get_result_with_data


@db_session
def get_favourite_songs(user_name: str) -> List[SongObject]:
    favs = FavouriteSong.select(lambda f: f.user_name == user_name)
    return [db_song_to_song_object(fav.song, favourite=True) for fav in favs]


@db_session
def get_favourite_song_ids(user_name: str) -> List[str]:
    favs = FavouriteSong.select(lambda f: f.user_name == user_name)
    return [fav.song.song_id for fav in favs]


@db_session
def get_favourite_song(user_name: str, song_id: str) -> ResultWithData[SongObject]:
    fav = FavouriteSong.get(lambda f: f.user_name == user_name and f.song.song_id == song_id)
    if fav is None:
        return get_result_with_error(SONG_FAVOURITE_NOT_EXIST)
    return get_result_with_data(db_song_to_song_object(fav.song, favourite=True))
