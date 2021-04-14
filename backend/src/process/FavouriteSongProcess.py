from http import HTTPStatus
from typing import Dict

from command.FavouriteSongCommands import add_favourite_song, remove_favourite_song
from query.FavouriteSongQueries import get_favourite_song
from query.SongQueries import get_song_by_id
from utils.HandleGammaToken import get_user_name_from_session
from utils.HttpResponse import HttpResponse, get_with_error, get_with_data


def handle_add_favourite(session: Dict, song_id: str) -> HttpResponse:
    user_name = get_user_name_from_session(session)
    if user_name.is_error:
        return get_with_error(HTTPStatus.UNAUTHORIZED, user_name.message)

    song_res = get_song_by_id(song_id)
    if song_res.is_error:
        return get_with_error(HTTPStatus.BAD_REQUEST, song_res.message)

    fav_res = get_favourite_song(user_name=user_name.data, song_id=song_id)
    if not fav_res.is_error:
        return get_with_data({})

    add_favourite_song(user_name=user_name.data, song_id=song_id)
    return get_with_data({})


def handle_remove_favourite(session: Dict, song_id: str) -> HttpResponse:
    user_name = get_user_name_from_session(session)
    if user_name.is_error:
        return get_with_error(HTTPStatus.UNAUTHORIZED, user_name.message)

    fav_res = get_favourite_song(user_name=user_name.data, song_id=song_id)
    if fav_res.is_error:
        return get_with_data({})

    remove_favourite_song(user_name=user_name.data, song_id=song_id)
    return get_with_data({})
