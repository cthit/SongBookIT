from typing import Dict
from uuid import UUID

from utils.HttpResponse import HttpResponse, get_with_data, get_with_error
from command.SongCommands import remove_song, create_song, update_song
from command.SongsToTagsCommands import create_songtotag, remove_songtotag
from objects.dataobject.SongToTagObject import SongToTagObject
from query.SongQueries import get_song_by_id, get_songs, get_song_by_name, get_avaliable_song_numbers
from query.SongToTagQueries import get_songtotag_by_song_id
from query.TagQueries import get_tags, get_tag_by_id
from validation.SongValidation import validate_song, validate_song_update
from validation.Validation import validate_short_id


def handle_get_songs_and_tags() -> HttpResponse:
    songs = get_songs()
    songs_json = {}
    for song in songs:
        songs_json[str(song.song_id)] = song.to_json()

    tags = get_tags()
    tags_json = {}
    for tag in tags:
        tags_json[str(tag.tag_id)] = tag.to_json()

    return get_with_data({
        'songs': songs_json,
        'tags': tags_json
    })


def handle_get_song_by_id(song_id: str) -> HttpResponse:
    short_id_res = validate_short_id(song_id)
    if short_id_res.is_error:
        return get_with_error(400, short_id_res.message)

    song_res = get_song_by_id(short_id_res.data)
    if song_res.is_error:
        return get_with_error(404, song_res.message)
    else:
        song = song_res.data
        tags_json = {}
        for tag_id in song.tags:
            tag_res = get_tag_by_id(tag_id)
            if not tag_res.is_error:
                tags_json[str(tag_id)] = tag_res.data.to_json()
        return get_with_data({
            'song': song.to_json(),
            'tags': tags_json
        })


def handle_get_avaliable_song_numbers() -> HttpResponse:
    numbers_res = get_avaliable_song_numbers()
    return get_with_data({'numbers': numbers_res.data})


def handle_create_song(song_request: Dict) -> HttpResponse:
    valid_song_res = validate_song(song_request)
    if valid_song_res.is_error:
        return get_with_error(400, valid_song_res.message)
    song = valid_song_res.data

    song_res = get_song_by_name(song.title)
    if not song_res.is_error:
        return get_with_error(400, "There already exists a song with the specified name")

    for tag_id in song.tags:
        tag_res = get_tag_by_id(tag_id)
        if tag_res.is_error:
            return get_with_error(400, tag_res.message)

    song_id = create_song(valid_song_res.data).data
    for tag_id in song.tags:
        create_songtotag(SongToTagObject(song=song_id, tag=tag_id))
    return get_with_data({'song_id': str(song_id)})


def handle_update_song(song_request: Dict) -> HttpResponse:
    valid_song_res = validate_song_update(song_request)
    if valid_song_res.is_error:
        return get_with_error(400, valid_song_res.message)
    song = valid_song_res.data

    song_res = get_song_by_name(song.title)
    if not song_res.is_error and song_res.data.song_id != song.song_id:
        return get_with_error(400, "There already exists a song with the specified name")

    songtotags_tag_ids = [stt.tag for stt in get_songtotag_by_song_id(song.song_id)]
    for tag_id in song.tags:
        if tag_id not in songtotags_tag_ids:
            create_songtotag(SongToTagObject(song=song.song_id, tag=tag_id))
    for stt_tag_id in songtotags_tag_ids:
        if stt_tag_id not in song.tags:
            remove_songtotag(SongToTagObject(song=song.song_id, tag=stt_tag_id))

    update_song(valid_song_res.data)
    return get_with_data({})


def handle_delete_song(song_id: str) -> HttpResponse:
    valid_id_res = validate_short_id(song_id)
    if valid_id_res.is_error:
        return get_with_error(400, valid_id_res.message)
    valid_song_id = valid_id_res.data

    song_res = get_song_by_id(valid_song_id)
    if song_res.is_error:
        return get_with_error(404, song_res.message)

    remove_song(valid_song_id)
    return get_with_data({})
