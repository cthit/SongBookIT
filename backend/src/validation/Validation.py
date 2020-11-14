import string
from typing import Dict, List
from utils.ResultWithData import ResultWithData, get_result_with_data, get_result_with_error


def validate_str(json: Dict, key: str) -> ResultWithData[str]:
    if key not in json:
        return get_result_with_error("Missing {0}".format(key))

    str_str = json[key]
    if isinstance(str_str, str):
        return get_result_with_data(str_str)
    else:
        get_result_with_error(f"{str_str} is not a string")


def validate_short_id(id_str: str) -> ResultWithData[str]:
    if len(id_str) != 4:
        get_result_with_error("Id must be of length 4")

    for c in id_str:
        if c not in string.ascii_lowercase:
            get_result_with_error("Id may only be composed lowercase ascii letters")

    return get_result_with_data(id_str)


def validate_short_id_key(json: Dict, key: str) -> ResultWithData[str]:
    if key not in json:
        return get_result_with_error("Missing {0}".format(key))
    id_str = json[key]

    return validate_short_id(id_str)


def validate_int(json: Dict, key: str) -> ResultWithData[int]:
    if key not in json:
        return get_result_with_error("Missing {0}".format(key))

    int_str = json[key]
    try:
        val = int(int_str)
        return get_result_with_data(val)
    except ValueError:
        return get_result_with_error("{0} is not a valid integer".format(int_str))


def validate_bool(json: Dict, key: str) -> ResultWithData[bool]:
    if key not in json:
        return get_result_with_error("Missing {0}".format(key))

    bool_str = json[key]
    try:
        val = bool(bool_str)
        return get_result_with_data(val)
    except ValueError:
        get_result_with_error("{0} is not a valid boolean".format(bool_str))


def validate_list(json: Dict, key: str) -> ResultWithData[List]:
    if key not in json:
        return get_result_with_error("Missing {0}".format(key))

    value = json[key]
    if type(value) is not list:
        return get_result_with_error("{0} must be a list".format(key))

    return get_result_with_data(value)


def validate_dict(json: Dict, key: str) -> ResultWithData[Dict]:
    if key not in json:
        return get_result_with_error("Missing {0}".format(key))

    value = json[key]
    if type(value) is not dict:
        return get_result_with_error("{0} must be an object".format(key))

    return get_result_with_data(value)
