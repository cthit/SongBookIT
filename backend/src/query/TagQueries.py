from typing import List
from pony.orm import db_session

from utils.ResultWithData import ResultWithData, get_result_with_data, get_result_with_error
from objects.dataobject.TagObject import TagObject
from db import Tag


@db_session
def get_tags() -> List[TagObject]:
    tags = Tag.select(lambda t: True)
    return [db_tag_to_tag_object(tag) for tag in tags]


@db_session
def get_tag_by_id(tag_id: str) -> ResultWithData[TagObject]:
    tag = Tag.get(tag_id=tag_id)
    if tag is None:
        return get_result_with_error(f"The tag with id={tag_id} does not exist")
    else:
        return get_result_with_data(db_tag_to_tag_object(tag))


def db_tag_to_tag_object(tag: Tag) -> TagObject:
    return TagObject(
        tag_id=tag.tag_id,
        name=tag.name,
        pretty_name_en=tag.pretty_name_en,
        pretty_name_sv=tag.pretty_name_sv,
        songs=[song_to_tag.song.song_id for song_to_tag in tag.song_tags]
    )
