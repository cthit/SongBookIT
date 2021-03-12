from pony.orm import db_session

from utils.ErrorCodes import TAG_ID_NOT_EXIST
from utils.ResultWithData import ResultWithData, get_result_with_error, get_result_with_data
from db import Tag
from objects.requestobjects import RequestTagObject
from utils.ShortUnique import short_unique_id


@db_session
def create_tag(tag: RequestTagObject) -> ResultWithData[str]:
    tag_id = short_unique_id()
    tag_created = Tag(
        tag_id=tag_id,
        name=tag.name,
        pretty_name_sv=tag.pretty_name_sv,
        pretty_name_en=tag.pretty_name_en
    )
    return get_result_with_data(tag_created.tag_id)


@db_session
def remove_tag(tag_id: str) -> ResultWithData:
    tag = Tag.get(tag_id=tag_id)
    if tag is None:
        return get_result_with_error(TAG_ID_NOT_EXIST)
    else:
        tag.delete()
        return get_result_with_data("The tag was successfully deleted")
