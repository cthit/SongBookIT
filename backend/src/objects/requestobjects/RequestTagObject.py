from dataclasses import dataclass
from typing import Optional


@dataclass
class RequestTagObject:
    tag_id: Optional[str]
    name: str
    pretty_name_sv: str
    pretty_name_en: str
