from dataclasses import dataclass
from typing import List, Optional


@dataclass
class RequestSongObject:
    song_id: Optional[str]
    number: int
    title: str
    melody: str
    author: str
    text: str
    tags: List[str]