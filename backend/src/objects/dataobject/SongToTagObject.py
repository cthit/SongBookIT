from dataclasses import dataclass
from uuid import UUID


@dataclass
class SongToTagObject:
    tag: UUID
    song: UUID



