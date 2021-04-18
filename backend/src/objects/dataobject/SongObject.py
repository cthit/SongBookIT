from dataclasses import dataclass
from typing import List, Optional


@dataclass
class SongObject:
    song_id: str
    favorite: Optional[bool]
    title: str
    number: int
    melody: str
    melody_link: str
    author: str
    text: str
    tags: List[str]

    def to_json(self):
        return {
            'song_id': str(self.song_id),
            'favorite':  False if self.favorite is None else self.favorite,
            'title': self.title,
            'number': self.number,
            'melody': self.melody,
            'melody_link' : self.melody_link,
            'author': self.author,
            'text': self.text,
            'tags': [str(tag_id) for tag_id in self.tags]
        }
