from dataclasses import dataclass
from typing import List, Optional
from uuid import UUID


@dataclass
class RequestSongObject:
    song_id: Optional[UUID]
    title: str
    melody: str
    author: str
    text: str
    tags: List[UUID]