from uuid import UUID

from HttpResponse import HttpResponse, get_with_data, get_with_error
from command.TagCommands import remove_tag_db
from query.TagQueries import get_tags_db, get_tag_by_id_db
from validation.Validation import validate_id


def get_tags() -> HttpResponse:
    tags = get_tags_db()
    tags_json = {}
    for tag in tags:
        tags_json[str(tag.tag_id)] = tag.to_json()

    return get_with_data({
        'tags': tags_json
    })


def get_tag_by_id(tag_id: str) -> HttpResponse:

    validation_res = validate_id(tag_id)
    if validation_res.is_error:
        return get_with_error(400, validation_res.message)

    tag_res = get_tag_by_id_db(UUID(tag_id))
    if tag_res.is_error:
        return get_with_error(404, tag_res.message)
    else:

        return get_with_data({
            'tag': tag_res.data.to_json(),
        })


def delete_tag(tag_id: str) -> HttpResponse:
    validation_res = validate_id(tag_id)
    if validation_res.is_error:
        return get_with_error(400, validation_res.message)

    song_res = remove_tag_db(UUID(tag_id))
    if song_res.is_error:
        return get_with_error(404, song_res.message)
    else:
        return get_with_data(song_res.data)
