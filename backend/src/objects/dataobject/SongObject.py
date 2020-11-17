from dataclasses import dataclass
from typing import List


@dataclass
class SongObject:
    song_id: str
    number: int
    title: str
    melody: str
    author: str
    text: str
    tags: List[str]

    def to_json(self):
        return {
            'song_id': str(self.song_id),
            'number': self.number,
            'title': self.title,
            'melody': self.melody,
            'author': self.author,
            'text': self.text,
            'tags': [str(tag_id) for tag_id in self.tags]
        }