from flask import Flask, request
from flask_restful import Resource, Api, abort
from flask_cors import CORS
from pony.orm import db_session, ObjectNotFound, select
from pony.orm.serialization import to_dict

from UUIDEncoder import UUIDEncoder
from db import Song, Tag

app = Flask(__name__)
api = Api(app)

app.config['RESTFUL_JSON'] = {
    'cls': UUIDEncoder,
    'ensure_ascii': False
}

cors = CORS(app, resources={r"/*": {"origins":"*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

class SongRes(Resource):
    @db_session
    def get(self, song_id):
        try:
            song = Song[song_id]
            return to_dict(song)
        except ObjectNotFound:
            return 404, "Unrecognized Song ID"

    @db_session
    def delete(self, song_id):
        try:
            song = Song[song_id]
            song.delete()
            return "Song deleted!"
        except ObjectNotFound:
            return 404, "Unrecognized Song ID"

    @db_session
    def put(self, song_id):
        data = request.get_json(force=True)
        song = Song[song_id]
        for key, value in data:
            song[key] = value

        return to_dict(song)


class SongsRes(Resource):
    @db_session
    def get(self):
        return to_dict([*Song.select()])

    @db_session
    def post(self):
        data = request.get_json(force=True)
        song = Song(**data)
        return to_dict(song)


class TagsRes(Resource):
    @db_session
    def get(self):
        return to_dict([*Tag.select(lambda t: True)])

    @db_session
    def post(self):
        data = request.get_json(force=True)
        tag = Tag(**data)
        print(to_dict(tag))


class TagRes(Resource):
    @db_session
    def get(self, tag_id):
        try:
            return to_dict(Tag[tag_id])
        except ObjectNotFound:
            return 404, "Unknown tag id"

    @db_session
    def delete(self, tag_id):
        try:
            Tag[tag_id].delete()
            return "Tag successfully deleted!"
        except ObjectNotFound:
            return 404, "Unknown tag id"


class TagSongsRes(Resource):
    @db_session
    def get(self, tag_id):
        return to_dict(Tag[tag_id].songs)


api.add_resource(SongsRes, '/songs')
api.add_resource(SongRes, '/songs/<string:song_id>')

api.add_resource(TagsRes, '/tags')
api.add_resource(TagRes, '/tags/<string:tag_id>')

api.add_resource(TagSongsRes, '/songs/tag/<string:tag_id>')
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
