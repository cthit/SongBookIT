from dataclasses import dataclass
from typing import List


@dataclass
class SongObject:
    song_id: str
    title: str
    number: int
    melody: str
    author: str
    text: str
    tags: List[str]

    def to_json(self):
        return {
            'song_id': str(self.song_id),
            'title': self.title,
            'number': self.number,
            'melody': self.melody,
            'author': self.author,
            'text': self.text,
            'tags': [str(tag_id) for tag_id in self.tags]
        }