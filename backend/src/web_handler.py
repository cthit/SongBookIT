import os

from functools import wraps
from http import HTTPStatus
import jwt
from flask import Flask, session, Response, request, send_file
from flask_cors import CORS
from flask_restful import Api, Resource
from md2pdf import md2pdf

from config import gamma_config as config
from config.config import RESOURCE_DATA_PATH
from process.GammaProcess import handle_gamma_me, handle_gamma_auth, handle_gamma_signout
from process.SongProcess import handle_get_songs_and_tags, handle_get_song_by_id, handle_delete_song, \
    handle_create_song, handle_update_song, handle_songbook_file
from process.TagProcess import handle_get_tags, handle_delete_tag, handle_get_tag_by_id, handle_update_tag, \
    handle_create_tag

app = Flask(__name__)
api = Api(app)

cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config.update(SESSION_COOKIE_SAMESITE='Strict')

app.secret_key = config.SECRET_KEY


def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "token" in session:
            authorities = jwt.decode(jwt=session['token'], options={'verify_signature': False})["authorities"]

            if config.GAMMA_ADMIN_AUTHORITY not in authorities:
                return Response(status=HTTPStatus.FORBIDDEN)
        return f(*args, **kwargs)

    return decorated_function


class SongRes(Resource):
    def get(self, song_id):
        resp = handle_get_song_by_id(song_id).get_response()
        return resp

    @admin_required
    def delete(self, song_id):
        return handle_delete_song(song_id).get_response()

    @admin_required
    def put(self, song_id):
        data = request.get_json()
        return handle_update_song(data, song_id).get_response()


class SongsRes(Resource):
    def get(self):
        return handle_get_songs_and_tags().get_response()

    @admin_required
    def post(self):
        data = request.get_json()
        return handle_create_song(data).get_response()


class TagsRes(Resource):
    def get(self):
        return handle_get_tags().get_response()

    @admin_required
    def post(self):
        data = request.get_json()
        return handle_create_tag(data).get_response()


class TagRes(Resource):
    def get(self, tag_id):
        return handle_get_tag_by_id(tag_id).get_response()

    @admin_required
    def delete(self, tag_id):
        return handle_delete_tag(tag_id).get_response()

    @admin_required
    def put(self, tag_id):
        data = request.get_json()
        return handle_update_tag(data, tag_id).get_response()


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


# timestamp is passed along to ensure that the browser doesn't cache the request
class DownloadSongbook(Resource):
    def get(self,type,  time_stamp):
        print(type)
        file_name = "songbook"
        path_md = f"{RESOURCE_DATA_PATH}{file_name}.md"
        handle_songbook_file(path_md)
        if type == "md":
            return send_file(
                filename_or_fp=path_md,
                as_attachment=True,
                attachment_filename=f"{file_name}.md")
        elif type == "pdf":
            path_pdf = f"{RESOURCE_DATA_PATH}{file_name}.pdf"
            os.remove(path_pdf) if os.path.exists(path_pdf) else None
            # subprocess.run(f"md2pdf {path_md} {path_pdf}", shell=True)
            md2pdf(path_pdf, md_file_path=path_md)
            return send_file(
                filename_or_fp=path_pdf,
                as_attachment=True,
                attachment_filename=f"{file_name}.pdf")


api.add_resource(SongsRes, '/api/songs')
api.add_resource(SongRes, '/api/songs/<string:song_id>')

api.add_resource(TagsRes, '/api/tags')
api.add_resource(TagRes, '/api/tags/<string:tag_id>')

api.add_resource(GammaAuth, '/api/auth')
api.add_resource(GammaMe, '/api/me')
api.add_resource(GammaSignout, '/api/signout')

# Timestamp is used to avoid problems with cache
api.add_resource(DownloadSongbook, '/api/download_songbook/<string:type>/<string:time_stamp>')


def host():
    app.run(host='0.0.0.0')
