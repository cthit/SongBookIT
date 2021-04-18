from pony.orm import db_session

from db import FavoriteSong
from utils.ResultWithData import ResultWithData, get_result_with_data


@db_session
def add_favorite_song(user_name: str, song_id: str) -> ResultWithData:
    FavoriteSong(user_name=user_name, song=song_id)
    return get_result_with_data({})


@db_session
def remove_favorite_song(user_name: str, song_id:str) -> ResultWithData:
    FavoriteSong.get(song=song_id, user_name=user_name).delete()
    return get_result_with_data({})
