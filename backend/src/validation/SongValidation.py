from typing import Dict

from utils.ResultWithData import get_result_with_error, get_result_with_data, ResultWithData
from objects.requestobjects.RequestSongObject import RequestSongObject
from validation.Validation import validate_str, validate_list, validate_short_id, validate_required_str


def validate_song(song: Dict) -> ResultWithData[RequestSongObject]:
    title_res = validate_required_str(song, 'title')
    if title_res.is_error:
        return get_result_with_error(title_res.message)

    melody_res = validate_str(song, 'melody')
    if melody_res.is_error:
        return get_result_with_error(melody_res.message)

    melody_link_res = validate_str(song, 'melody_link')
    if melody_link_res.is_error:
        return get_result_with_error(melody_link_res.message)

    author_res = validate_str(song, 'author')
    if author_res.is_error:
        return get_result_with_error(author_res.message)

    text_res = validate_required_str(song, 'text')
    if text_res.is_error:
        return get_result_with_error(text_res.message)

    tags_res = validate_list(song, 'tags')
    if tags_res.is_error:
        return get_result_with_error(tags_res.message)
    tag_ids = []
    for tag in tags_res.data:
        tag_id_res = validate_short_id(tag)
        if tag_id_res.is_error:
            return get_result_with_error(tag_id_res.message)
        tag_ids.append(tag_id_res.data)

    return get_result_with_data(RequestSongObject(
        song_id=None,
        title=title_res.data,
        melody=melody_res.data,
        melody_link=melody_link_res.data,
        author=author_res.data,
        text=text_res.data,
        tags=tag_ids
    ))


def validate_song_update(song: Dict, song_id: str) -> ResultWithData[RequestSongObject]:
    id_res = validate_short_id(song_id)
    if id_res.is_error:
        return get_result_with_error(id_res.message)

    valid_song_res = validate_song(song)
    if valid_song_res.is_error:
        return get_result_with_error(valid_song_res.message)
    valid_song = valid_song_res.data

    return get_result_with_data(RequestSongObject(
        song_id=id_res.data,
        title=valid_song.title,
        melody=valid_song.melody,
        melody_link=valid_song.melody_link,
        author=valid_song.author,
        text=valid_song.text,
        tags=valid_song.tags
    ))

