from functools import wraps

import jwt
from flask import Flask, session, Response, request
from flask_cors import CORS
from flask_restful import Api, Resource
from pony.orm import db_session
from pony.orm.serialization import to_dict

from config import gamma_config as config
from db import Tag
from process.GammaProcess import handle_gamma_me, handle_gamma_auth, handle_gamma_signout
from process.SongProcess import handle_get_songs_and_tags, handle_get_song_by_id, handle_delete_song, \
    handle_create_song, handle_update_song
from process.TagProcess import handle_get_tags, handle_delete_tag, handle_get_tag_by_id

app = Flask(__name__)
api = Api(app)

cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

app.secret_key = config.SECRET_KEY


def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "token" in session:
            authorities = jwt.decode(jwt=session['token'], options={'verify_signature': False})["authorities"]

            if config.GAMMA_ADMIN_AUTHORITY not in authorities:
                return Response(status=403)
        return f(*args, **kwargs)

    return decorated_function


class SongRes(Resource):
    @db_session
    def get(self, song_id):
        resp = handle_get_song_by_id(song_id).get_response()
        return resp

    @admin_required
    @db_session
    def delete(self, song_id):
        return handle_delete_song(song_id).get_response()

    @admin_required
    @db_session
    def put(self, song_id):
        data = request.get_json()
        return handle_update_song(data).get_response()


class SongsRes(Resource):
    def get(self):
        return handle_get_songs_and_tags().get_response()

    @admin_required
    @db_session
    def post(self):
        data = request.get_json()
        return handle_create_song(data).get_response()


class TagsRes(Resource):
    @db_session
    def get(self):
        return handle_get_tags().get_response()

    @admin_required
    @db_session
    def post(self):
        data = request.get_json(force=True)
        tag = Tag(**data)
        print(to_dict(tag))


class TagRes(Resource):
    @db_session
    def get(self, tag_id):
        return handle_get_tag_by_id(tag_id).get_response()

    @admin_required
    @db_session
    def delete(self, tag_id):
        return handle_delete_tag(tag_id).get_response()


class GammaMe(Resource):
    def get(self):
        return handle_gamma_me(session).get_response()


class GammaAuth(Resource):
    def post(self):
        data = request.get_json()
        return handle_gamma_auth(data, session).get_response()


class GammaSignout(Resource):
    def post(self):
        return handle_gamma_signout().get_response()


api.add_resource(SongsRes, '/api/songs')
api.add_resource(SongRes, '/api/songs/<string:song_id>')

api.add_resource(TagsRes, '/api/tags')
api.add_resource(TagRes, '/api/tags/<string:tag_id>')

api.add_resource(GammaAuth, '/api/auth')
api.add_resource(GammaMe, '/api/me')
api.add_resource(GammaSignout, '/api/signout')


def host():
    app.run(host='0.0.0.0')
