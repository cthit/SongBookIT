from flask import Flask, request, session, Response
from flask_restful import Resource, Api, abort
from flask_cors import CORS
from pony.orm import db_session, ObjectNotFound, select
from pony.orm.serialization import to_dict

from UUIDEncoder import UUIDEncoder
from config import SECRET_KEY, GAMMA_CLIENT_ID, GAMMA_AUTHORIZATION_URI, GAMMA_REDIRECT_URI, GAMMA_TOKEN_URI, \
    GAMMA_SECRET, GAMMA_ME_URI, GAMMA_ADMIN_AUTHORITY
from db import Song, Tag
import requests
import base64
import urllib
from functools import wraps
import jwt

app = Flask(__name__)
api = Api(app)

app.config['RESTFUL_JSON'] = {
    'cls': UUIDEncoder,
    'ensure_ascii': False
}

cors = CORS(app, resources={r"/*": {"origins":"*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

app.secret_key = SECRET_KEY

# TODO: Add @admin_required where it's needed 

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "token" in session:
            authorities = jwt.decode(jwt=session['token'], options={'verify_signature': False})["authorities"]

            if not GAMMA_ADMIN_AUTHORITY in authorities:
                return Response(status=403)

        return f(*args, **kwargs)

    return decorated_function

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
        maybe_song = Song.select(lambda s: s.title == data["title"]).first()
        if maybe_song:
            return {'message': 'Song already exists'}, 400
        tags = [Tag[tag] for tag in data["tags"]]
        data["tags"] = tags
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


@app.route('/api/me', methods=['GET'])
def gammaMe():
    if "token" in session:
        headers = {
            'Authorization': 'Bearer ' + session["token"]
        }
        res = requests.get(GAMMA_ME_URI, headers=headers)
        if res.ok:
            return Response(response=res, status=200)

    response_type = "response_type=code"
    client_id = "client_id=" + GAMMA_CLIENT_ID
    redirect_uri = "redirect_uri=" + GAMMA_REDIRECT_URI
    return Response(GAMMA_AUTHORIZATION_URI + "?" + response_type + "&" + client_id + "&" + redirect_uri, status=401)

@app.route('/api/auth', methods=['POST'])
def gammaPost():
    data = {
        'grant_type': 'authorization_code',
        'client_id': GAMMA_CLIENT_ID,
        'redirect_uri': GAMMA_REDIRECT_URI,
        'code': request.get_json()["code"]
    }

    c = GAMMA_CLIENT_ID + ":" + GAMMA_SECRET

    encodedBytes = base64.b64encode(c.encode("utf-8"))
    encodedStr = str(encodedBytes, "utf-8")

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + encodedStr
    }

    res = requests.post(GAMMA_TOKEN_URI + "?" + urllib.parse.urlencode(data), headers=headers)
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

api.add_resource(TagSongsRes, '/api/songs/tag/<string:tag_id>')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
