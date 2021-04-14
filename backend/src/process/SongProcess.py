from typing import Dict
from http import HTTPStatus

from mdutils import MdUtils

from process.TagProcess import get_tags_json
from query.FavouriteSongQueries import get_favourite_song_ids, get_favourite_song
from utils.ErrorCodes import SONG_TITLE_ALREADY_EXIST
from utils.HandleGammaToken import get_user_name_from_session
from utils.HttpResponse import HttpResponse, get_with_data, get_with_error
from command.SongCommands import remove_song, create_song, update_song
from command.SongsToTagsCommands import create_songtotag, remove_songtotag
from objects.dataobject.SongToTagObject import SongToTagObject
from query.SongQueries import get_song_by_id, get_songs, get_song_by_title
from query.SongToTagQueries import get_songtotag_by_song_id, get_songs_by_tag_id
from query.TagQueries import get_tags, get_tag_by_id
from validation.SongValidation import validate_song, validate_song_update
from validation.Validation import validate_short_id


def handle_get_songs_and_tags(session: Dict) -> HttpResponse:

    songs = get_songs()

    user_name_res = get_user_name_from_session(session)
    if not user_name_res.is_error:
        fav_song_ids = get_favourite_song_ids(user_name_res.data)
        for song in songs:
            song.favourite = song.song_id in fav_song_ids

    songs_json = {}
    for song in songs:
        songs_json[str(song.song_id)] = song.to_json()

    tags = get_tags()
    tags_json = {}
    for tag in tags:
        tags_json[str(tag.tag_id)] = tag.to_json()

    return get_with_data({
        'songs': songs_json,
        'tags': tags_json
    })


def handle_get_song_by_id(session, song_id: str) -> HttpResponse:
    short_id_res = validate_short_id(song_id)
    if short_id_res.is_error:
        return get_with_error(HTTPStatus.BAD_REQUEST, short_id_res.message)

    song_res = get_song_by_id(short_id_res.data)
    if song_res.is_error:
        return get_with_error(HTTPStatus.NOT_FOUND, song_res.message)

    else:
        user_name_res = get_user_name_from_session(session)
        if not user_name_res.is_error:
            fav_song = get_favourite_song(user_name=user_name_res.data, song_id=song_id)
            song_res.data.favourite = not fav_song.is_error

        tags_json = get_tags_json()

        return get_with_data({
            'song': song_res.data.to_json(),
            'tags': tags_json
        })


def handle_create_song(song_request: Dict) -> HttpResponse:
    valid_song_res = validate_song(song_request)
    if valid_song_res.is_error:
        return get_with_error(HTTPStatus.BAD_REQUEST, valid_song_res.message)
    song = valid_song_res.data

    song_res = get_song_by_title(song.title)
    if not song_res.is_error:
        return get_with_error(HTTPStatus.BAD_REQUEST, SONG_TITLE_ALREADY_EXIST)

    for tag_id in song.tags:
        tag_res = get_tag_by_id(tag_id)
        if tag_res.is_error:
            return get_with_error(HTTPStatus.BAD_REQUEST, tag_res.message)

    song_id = create_song(valid_song_res.data).data
    for tag_id in song.tags:
        create_songtotag(SongToTagObject(song=song_id, tag=tag_id))
    return get_with_data({'song_id': str(song_id)})


def handle_update_song(song_request: Dict, song_id: str) -> HttpResponse:
    valid_song_res = validate_song_update(song_request, song_id)
    if valid_song_res.is_error:
        return get_with_error(HTTPStatus.BAD_REQUEST, valid_song_res.message)
    song = valid_song_res.data

    song_res = get_song_by_title(song.title)
    if not song_res.is_error and song_res.data.song_id != song.song_id:
        return get_with_error(HTTPStatus.BAD_REQUEST, SONG_TITLE_ALREADY_EXIST)

    songtotags_tag_ids = [stt.tag for stt in get_songtotag_by_song_id(song.song_id)]
    for tag_id in song.tags:
        if tag_id not in songtotags_tag_ids:
            create_songtotag(SongToTagObject(song=song.song_id, tag=tag_id))
    for stt_tag_id in songtotags_tag_ids:
        if stt_tag_id not in song.tags:
            remove_songtotag(SongToTagObject(song=song.song_id, tag=stt_tag_id))

    update_song(valid_song_res.data)
    return get_with_data({})


def handle_delete_song(song_id: str) -> HttpResponse:
    valid_id_res = validate_short_id(song_id)
    if valid_id_res.is_error:
        return get_with_error(HTTPStatus.BAD_REQUEST, valid_id_res.message)
    valid_song_id = valid_id_res.data

    song_res = get_song_by_id(valid_song_id)
    if song_res.is_error:
        return get_with_error(HTTPStatus.NOT_FOUND, song_res.message)

    remove_song(valid_song_id)
    return get_with_data({})


def handle_songbook_file(path: str) -> None:
    md_file = MdUtils(file_name=path, author="Genererad från Songbookit.chalmers.it")
    tags = get_tags()
    songs_per_tag = [(tag, sorted(get_songs_by_tag_id(tag.tag_id), key=lambda s: s.number))for tag in tags]
    songs_per_tag = sorted(songs_per_tag, key=lambda spt: spt[1][0].number)
    for tag, songs in songs_per_tag:
        md_file.new_header(1, tag.name)
        for song in songs:
            dashes = "".join('-' for _ in range(len(song.title)))
            tag_names = ", ".join(get_tag_by_id(tag).data.name for tag in song.tags)
            md_file.new_header(2, f"Nr.{song.number} {song.title}")
            md_file.write(dashes)
            md_file.new_line(f"Text: {song.author}", bold_italics_code="b")
            md_file.new_line(f"Melodi: {song.melody}", bold_italics_code="i")
            md_file.new_line(f"Kategorier: {tag_names}", bold_italics_code="i")
            md_file.new_paragraph(song.text)
            md_file.new_paragraph()

    md_file.new_table_of_contents(table_title='IT\'s sångbok', depth=3)
    md_file.create_md_file()
