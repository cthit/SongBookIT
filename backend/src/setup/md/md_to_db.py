import re

from pony.orm import db_session
from src.db import Tag, Song, SongToTag

mdstr: str = open("setup/md/sangbok.md", 'r', encoding="utf-8").read()
category_indices = [c.start() for c in re.finditer(r"[^\n]+\n=+", mdstr)]

parts = [mdstr[i:j] for i, j in zip(category_indices, category_indices[1:] + [None])]

categories = [re.split(r"\n=+\n", c) for c in parts]


def parse_song(song):
    try:
        title, rest = re.split("\n-+\n", song)
        m = re.search(r"\n\*?[mM][eE][lL]:([^\n\*]+)", rest)
        if m is not None and m.groups()[0] is not None:
            mel = str.strip(m.groups()[0])
        else:
            mel = None
        a = re.search(r"\n\*?[tT][eE][xX][tT]: ([^\n\*]+)", rest)
        if a is not None and a.groups()[0] is not None:
            author = str.strip(a.groups()[0]) if a.groups()[0] is not None else None
        else:
            author = "Unknown"
        return title, mel, author, rest
    except Exception:
        a = 2


def get_songs(data):
    song_indices = [c.start() for c in re.finditer(r"[^\n]+\n-+\n", data)]
    songs = [data[i:j] for i, j in zip(song_indices[:-1], song_indices[1:]) if j - i > 10]
    res = []
    for song in songs:
        title, mel, author, text = parse_song(song)
        res.append({'title': title, 'melody': mel, 'author': author, 'text': text})
    return res


@db_session
def add_category(cat, data):
    t = Tag(name=cat, pretty_name_sv=cat, pretty_name_en=cat)
    for song in get_songs(data):
        s = Song(title=song['title'], author=song['author'], text=song['text'], melody=song['melody'])
        SongToTag(tag=t, song=s)
        if song['melody'] is not None:
            s.melody = song['melody']


def add_songs_from_md():
    for cat, data in categories:
        if str.isspace(cat): continue
        add_category(cat, data)
