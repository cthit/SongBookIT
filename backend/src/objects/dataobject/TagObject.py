from dataclasses import dataclass
from typing import List


@dataclass
class TagObject:
    tag_id: str
    name: str
    pretty_name_sv: str
    pretty_name_en: str
    songs: List[str]

    def to_json(self):
        return {
            'tag_id': str(self.tag_id),
            'name': self.name,
            'pretty_name_sv': self.pretty_name_sv,
            'pretty_name_en': self.pretty_name_en,
            'song': [str(song_id) for song_id in self.songs],
            }
