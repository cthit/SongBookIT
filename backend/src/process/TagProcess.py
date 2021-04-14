from http import HTTPStatus
from typing import Dict

from utils.ErrorCodes import TAG_TITLE_ALREADY_EXIST
from utils.HttpResponse import HttpResponse, get_with_data, get_with_error
from command.TagCommands import remove_tag, create_tag, update_tag
from query.TagQueries import get_tags, get_tag_by_id, get_tag_by_name
from validation.TagValidation import validate_tag, validate_tag_update
from validation.Validation import validate_short_id


def handle_get_tags() -> HttpResponse:
    tags_json = get_tags_json()

    return get_with_data({
        'tags': tags_json
    })


def get_tags_json() -> [Dict]:
    tags = get_tags()
    tags_json = {}
    for tag in tags:
        tags_json[str(tag.tag_id)] = tag.to_json()
    return tags_json



def handle_get_tag_by_id(tag_id: str) -> HttpResponse:

    short_id_res = validate_short_id(tag_id)
    if short_id_res.is_error:
        return get_with_error(HTTPStatus.BAD_REQUEST, short_id_res.message)

    tag_res = get_tag_by_id(short_id_res.data)
    if tag_res.is_error:
        return get_with_error(HTTPStatus.NOT_FOUND, tag_res.message)
    else:

        return get_with_data({
            'tag': tag_res.data.to_json(),
        })


def handle_create_tag(tag_request: Dict) -> HttpResponse:
    valid_tag_res = validate_tag(tag_request)
    if valid_tag_res.is_error:
        return get_with_error(HTTPStatus.BAD_REQUEST, valid_tag_res.message)
    tag = valid_tag_res.data

    tag_res = get_tag_by_name(tag.name)
    if not tag_res.is_error:
        return get_with_error(HTTPStatus.BAD_REQUEST, TAG_TITLE_ALREADY_EXIST)

    tag_id = create_tag(valid_tag_res.data).data
    return get_with_data({'tag_id': str(tag_id)})


def handle_update_tag(tag_request: Dict, tag_id: str) -> HttpResponse:
    valid_tag_res = validate_tag_update(tag_request, tag_id)
    if valid_tag_res.is_error:
        return get_with_error(HTTPStatus.BAD_REQUEST, valid_tag_res.message)
    tag = valid_tag_res.data

    tag_res = get_tag_by_name(tag.name)
    if not tag_res.is_error and tag_res.data.tag_id != tag.tag_id:
        return get_with_error(HTTPStatus.BAD_REQUEST, TAG_TITLE_ALREADY_EXIST)

    update_tag(valid_tag_res.data)
    return get_with_data({})


def handle_delete_tag(tag_id: str) -> HttpResponse:
    short_id_res = validate_short_id(tag_id)
    if short_id_res.is_error:
        return get_with_error(HTTPStatus.BAD_REQUEST, short_id_res.message)

    song_res = remove_tag(short_id_res.data)
    if song_res.is_error:
        return get_with_error(HTTPStatus.NOT_FOUND, song_res.message)
    else:
        return get_with_data(song_res.data)
