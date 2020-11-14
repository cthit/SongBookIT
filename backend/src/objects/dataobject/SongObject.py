from dataclasses import dataclass
from typing import List
from uuid import UUID


@dataclass
class SongObject:
    song_id: UUID
    title: str
    melody: str
    author: str
    text: str
    tags: List[UUID]

    def to_json(self):
        return {
            'song_id': str(self.song_id),
            'title': self.title,
            'melody': self.melody,
            'author': self.author,
            'text': self.text,
            'tags': [str(tag_id) for tag_id in self.tags]
        }