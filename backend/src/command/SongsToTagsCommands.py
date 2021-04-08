from uuid import UUID

from pony.orm import db_session

from utils.ResultWithData import ResultWithData, get_result_with_data
from db import SongToTag
from objects.dataobject.SongToTagObject import SongToTagObject


@db_session
def create_songtotag(stt: SongToTagObject) -> ResultWithData[UUID]:
    stt_id = SongToTag(song=stt.song, tag=stt.tag)
    return get_result_with_data(stt_id)


@db_session
def remove_songtotag(songtotag: SongToTagObject) -> ResultWithData:
    SongToTag.get(song=songtotag.song, tag=songtotag.tag).delete()
    return get_result_with_data({})
