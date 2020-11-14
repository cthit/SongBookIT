from uuid import UUID

from utils.HttpResponse import HttpResponse, get_with_data, get_with_error
from command.TagCommands import remove_tag
from query.TagQueries import get_tags, get_tag_by_id
from validation.Validation import validate_short_id


def handle_get_tags() -> HttpResponse:
    tags = get_tags()
    tags_json = {}
    for tag in tags:
        tags_json[str(tag.tag_id)] = tag.to_json()

    return get_with_data({
        'tags': tags_json
    })


def handle_get_tag_by_id(tag_id: str) -> HttpResponse:

    short_id_res = validate_short_id(tag_id)
    if short_id_res.is_error:
        return get_with_error(400, short_id_res.message)

    tag_res = get_tag_by_id(short_id_res.data)
    if tag_res.is_error:
        return get_with_error(404, tag_res.message)
    else:

        return get_with_data({
            'tag': tag_res.data.to_json(),
        })


def handle_delete_tag(tag_id: str) -> HttpResponse:
    short_id_res = validate_short_id(tag_id)
    if short_id_res.is_error:
        return get_with_error(400, short_id_res.message)

    song_res = remove_tag(short_id_res.data)
    if song_res.is_error:
        return get_with_error(404, song_res.message)
    else:
        return get_with_data(song_res.data)
