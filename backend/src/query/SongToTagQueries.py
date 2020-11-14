from typing import List
from uuid import UUID

from pony.orm import db_session

from ResultWithData import ResultWithData, get_result_with_error, get_result_with_data
from objects.dataobject.SongObject import SongObject
from db import Song, SongToTag
from objects.dataobject.SongToTagObject import SongToTagObject


@db_session
def get_songtotag_db() -> List[SongToTagObject]:
    songtotags = SongToTag.select(lambda st: True)
    return [db_songtotag_to_songtotag_object(songtotag) for songtotag in songtotags]

def get_songtotag_by_song_db(song_id: UUID) -> List[SongToTagObject]:
    songtotags = SongToTag.select(lambda st: st.song.song_id == song_id )
    return [db_songtotag_to_songtotag_object(songtotag) for songtotag in songtotags]


@db_session
def db_songtotag_to_songtotag_object(songtotag: SongToTag) -> SongToTagObject:
    return SongToTagObject(
        song=songtotag.song,
        tag=songtotag.tag
    )
