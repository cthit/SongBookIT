from uuid import UUID

from pony.orm import db_session

from ResultWithData import ResultWithData, get_result_with_error, get_result_with_data
from db import Tag


@db_session
def remove_tag_db(tag_id: UUID) -> ResultWithData:
    tag = Tag.get(tag_id=tag_id)
    if tag is None:
        return get_result_with_error("The tag specified does not exist")
    else:
        tag.delete()
        return get_result_with_data("The tag was successfully deleted")
