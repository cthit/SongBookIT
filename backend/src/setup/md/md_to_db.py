import re

from command.SongCommands import create_song
from command.SongsToTagsCommands import create_songtotag
from command.TagCommands import create_tag
from config.config import INIT_DATA_PATH
from objects.dataobject.SongToTagObject import SongToTagObject
from objects.requestobjects.RequestSongObject import RequestSongObject
from objects.requestobjects.RequestTagObject import RequestTagObject

mdstr: str = open( f"{INIT_DATA_PATH}sangbok.md", 'r', encoding="utf-8").read()

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


def add_category(cat, data):
    t = RequestTagObject(
        tag_id=None,
        name=cat,
        pretty_name_sv=cat,
        pretty_name_en=cat)
    tag_id = create_tag(t).data
    for song in get_songs(data):
        s = RequestSongObject(
            song_id=None,
            title=song['title'],
            melody="",
            author=song['author'],
            text=song['text'],
            tags=[]
        )
        if song['melody'] is not None:
            s.melody = song['melody']
        song_id = create_song(s).data
        stt = SongToTagObject(song=song_id, tag=tag_id)
        create_songtotag(stt)


def add_songs_from_md():
    for cat, data in categories:
        if str.isspace(cat):
            continue
        add_category(cat, data)
