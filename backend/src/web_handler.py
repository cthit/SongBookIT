import base64
import urllib
from functools import wraps

import jwt
import requests
from flask import Flask, session, Response, request
from flask_cors import CORS
from flask_restful import Api, Resource
from pony.orm import db_session, ObjectNotFound
from pony.orm.serialization import to_dict

from config import gamma_config as config
from db import Song, Tag
from process.SongProcess import handle_get_songs_and_tags, handle_get_song_by_id, handle_delete_song, handle_create_song, handle_update_song
from process.TagProcess import handle_get_tags, handle_delete_tag, handle_get_tag_by_id

app = Flask(__name__)
api = Api(app)

cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

app.secret_key = config.SECRET_KEY


# TODO: Add @admin_required where it's needed

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "token" in session:
            authorities = jwt.decode(jwt=session['token'], options={'verify_signature': False})["authorities"]

            if not config.GAMMA_ADMIN_AUTHORITY in authorities:
                return Response(status=403)

        return f(*args, **kwargs)

    return decorated_function


class SongRes(Resource):
    @db_session
    def get(self, song_id):
        resp = handle_get_song_by_id(song_id).get_response()
        return  resp

    @db_session
    def delete(self, song_id):
        return handle_delete_song(song_id).get_response()

    @db_session
    def put(self, song_id):
        data = request.get_json()
        return handle_update_song(data).get_response()


class SongsRes(Resource):
    def get(self):
        return handle_get_songs_and_tags().get_response()

    @db_session
    def post(self):
        data = request.get_json()
        return handle_create_song(data).get_response()


class TagsRes(Resource):
    @db_session
    def get(self):
        return handle_get_tags().get_response()

    @db_session
    def post(self):
        data = request.get_json(force=True)
        tag = Tag(**data)
        print(to_dict(tag))


class TagRes(Resource):
    @db_session
    def get(self, tag_id):
        return handle_get_tag_by_id(tag_id).get_response()

    @db_session
    def delete(self, tag_id):
        return handle_delete_tag(tag_id).get_response()

@app.route('/api/me', methods=['GET'])
def gammaMe():
    if "token" in session:
        headers = {
            'Authorization': 'Bearer ' + session["token"]
        }
        res = requests.get(config.GAMMA_ME_URI, headers=headers)
        if res.ok:
            return Response(response=res, status=200)

    response_type = "response_type=code"
    client_id = "client_id=" + config.GAMMA_CLIENT_ID
    redirect_uri = "redirect_uri=" + config.GAMMA_REDIRECT_URI
    return Response(config.GAMMA_AUTHORIZATION_URI + "?" + response_type + "&" + client_id + "&" + redirect_uri,
                    status=401)


@app.route('/api/auth', methods=['POST'])
def gammaPost():
    data = {
        'grant_type': 'authorization_code',
        'client_id': config.GAMMA_CLIENT_ID,
        'redirect_uri': config.GAMMA_REDIRECT_URI,
        'code': request.get_json()["code"]
    }

    c = config.GAMMA_CLIENT_ID + ":" + config.GAMMA_SECRET

    encodedBytes = base64.b64encode(c.encode("utf-8"))
    encodedStr = str(encodedBytes, "utf-8")

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + encodedStr
    }

    res = requests.post(config.GAMMA_TOKEN_URI + "?" + urllib.parse.urlencode(data), headers=headers)
    if res.ok:
        access_token = res.json()["access_token"]
        session["token"] = access_token
        return Response(status=200)
    else:
        return Response(status=500)


api.add_resource(SongsRes, '/api/songs')
api.add_resource(SongRes, '/api/songs/<string:song_id>')

api.add_resource(TagsRes, '/api/tags')
api.add_resource(TagRes, '/api/tags/<string:tag_id>')


def host():
    app.run(host='0.0.0.0')
