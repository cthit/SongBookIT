from uuid import UUID

from pony.orm import db_session, delete

from ResultWithData import ResultWithData, get_result_with_data
from db import SongToTag
from objects.dataobject.SongToTagObject import SongToTagObject


@db_session
def create_songtotag_db(songtotag: SongToTagObject) -> ResultWithData[UUID]:
    songtotag_id = SongToTag(song=songtotag.song, tag=songtotag.tag)
    return get_result_with_data(songtotag_id)


@db_session
def remove_songtotag_db(songtotag: SongToTagObject) -> ResultWithData:
    delete(SongToTag.get(song=songtotag.song, tag=songtotag.tag))
    return get_result_with_data({})
