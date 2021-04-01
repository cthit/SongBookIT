from typing import List

from pony.orm import db_session

from db import SongToTag
from objects.dataobject import SongObject
from objects.dataobject.SongToTagObject import SongToTagObject
from query.SongQueries import db_song_to_song_object


@db_session
def get_songtotags() -> List[SongToTagObject]:
    songtotags = SongToTag.select(lambda st: True)
    return [db_songtotag_to_songtotag_object(songtotag) for songtotag in songtotags]

@db_session
def get_songtotag_by_song_id(song_id: str) -> List[SongToTagObject]:
    songtotags = SongToTag.select(lambda st: st.song.song_id == song_id)
    return [db_songtotag_to_songtotag_object(songtotag) for songtotag in songtotags]


@db_session
def get_songs_by_tag_id(tag_id: str) -> List[SongObject]:
    songtotags = SongToTag.select(lambda st: st.tag.tag_id == tag_id)
    return [db_song_to_song_object(stt.song) for stt in songtotags]


@db_session
def db_songtotag_to_songtotag_object(songtotag: SongToTag) -> SongToTagObject:
    return SongToTagObject(
        song=songtotag.song.song_id,
        tag=songtotag.tag.tag_id
    )
