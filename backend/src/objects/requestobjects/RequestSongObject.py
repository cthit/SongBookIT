from dataclasses import dataclass
from typing import List, Optional


@dataclass
class RequestSongObject:
    song_id: Optional[str]
    title: str
    melody: str
    author: str
    text: str
    tags: List[str]