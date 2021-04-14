from typing import Dict

import jwt

from utils.ErrorCodes import NO_TOKEN_IN_SESSION
from utils.ResultWithData import ResultWithData, get_result_with_error, get_result_with_data


def get_user_name_from_session(session: Dict) -> ResultWithData[str]:
    if "token" in session:
        token = jwt.decode(jwt=session['token'], options={'verify_signature': False})
        return get_result_with_data(token["user_name"])
    else:
        return get_result_with_error(NO_TOKEN_IN_SESSION)


def get_authorities_from_session(session: Dict) -> ResultWithData[str]:
    if "token" in session:
        token = jwt.decode(jwt=session['token'], options={'verify_signature': False})
        return get_result_with_data(token["authorities"])
    else:
        return get_result_with_error(NO_TOKEN_IN_SESSION)
