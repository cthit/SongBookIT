import base64
import urllib
from typing import Dict

from http import HTTPStatus

import requests
from flask import Response
from logging import getLogger
from config import gamma_config as config
from config.gamma_config import GAMMA_AUTHORIZATION_URI

from utils.HttpResponse import HttpResponse, get_with_response


def handle_gamma_me(session: Dict) -> HttpResponse:
    if "token" in session:
        headers = {
            'Authorization': f'Bearer {session["token"]}'
        }
        res = requests.get(config.GAMMA_ME_URI, headers=headers)
        if res.ok:
            return get_with_response(Response(response=res, status=HTTPStatus.OK))

    response_type = "response_type=code"
    client_id = "client_id=" + config.GAMMA_CLIENT_ID
    redirect_uri = "redirect_uri=" + config.GAMMA_REDIRECT_URI
    response = f"{GAMMA_AUTHORIZATION_URI}?{response_type}&{client_id}&{redirect_uri}"
    headers = {
        "location": response
    }
    return get_with_response(Response(response=response, headers=headers, status=HTTPStatus.UNAUTHORIZED))


def handle_gamma_auth(request: Dict, session: Dict) -> HttpResponse:
    data = {
        'grant_type': 'authorization_code',
        'client_id': config.GAMMA_CLIENT_ID,
        'redirect_uri': config.GAMMA_REDIRECT_URI,
        'code': request["code"]
    }

    c = config.GAMMA_CLIENT_ID + ":" + config.GAMMA_SECRET

    encodedBytes = base64.b64encode(c.encode("utf-8"))
    encodedStr = str(encodedBytes, "utf-8")

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': f'Basic {encodedStr}'
    }

    res = requests.post(config.GAMMA_TOKEN_URI + "?" + urllib.parse.urlencode(data), headers=headers)
    if res.ok:
        access_token = res.json()["access_token"]
        session["token"] = access_token
        return get_with_response(Response(response=res, status=HTTPStatus.OK))
    else:
        logger = getLogger(__name__)
        logger.error(f"An error occurred when communicating with Gamma:")
        logger.error(res)
        return get_with_response(Response(status=HTTPStatus.INTERNAL_SERVER_ERROR))


def handle_gamma_signout(session: Dict):
    session.clear()
    return get_with_response(Response(status=HTTPStatus.OK))
