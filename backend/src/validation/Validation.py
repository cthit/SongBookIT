import string
from typing import Dict, List

from utils.ErrorCodes import ID_NOT_LENGTH_FOUR, ID_NOT_LOWERCASE
from utils.ResultWithData import ResultWithData, get_result_with_data, get_result_with_error


def validate_str(json: Dict, key: str) -> ResultWithData[str]:
    if key not in json:
        return get_result_with_error(f"Missing {key}")

    str_str = json[key]
    if isinstance(str_str, str):
        return get_result_with_data(str_str)
    else:
        return get_result_with_error(f"Error in {key}: {str_str} is not a string")


def validate_required_str(json: Dict, key: str) -> ResultWithData[str]:
    if key not in json:
        return get_result_with_error(f"Missing {key}")

    str_str = json[key]
    if len(str_str) == 0:
        return get_result_with_error(f"Error in {key}: Can't be length zero")
    if isinstance(str_str, str):
        return get_result_with_data(str_str)
    else:
        return get_result_with_error(f"Error in {key}: {str_str} is not a string")


def validate_short_id(id_str: str) -> ResultWithData[str]:
    if len(id_str) != 4:
        return get_result_with_error(ID_NOT_LENGTH_FOUR)

    for c in id_str:
        if c not in string.ascii_lowercase:
            return get_result_with_error(ID_NOT_LOWERCASE)

    return get_result_with_data( id_str)


def validate_short_id_key(json: Dict, key: str) -> ResultWithData[str]:
    if key not in json:
        return get_result_with_error(f"Missing {key}")
    id_str = json[key]

    res = validate_short_id(id_str)
    res.message = f"Error in {key}: " + res.message
    return res


def validate_int(json: Dict, key: str) -> ResultWithData[int]:
    if key not in json:
        return get_result_with_error(f"Missing {key}")

    int_str = json[key]
    try:
        val = int(int_str)
        return get_result_with_data(val)
    except ValueError:
        return get_result_with_error(f"Error in {key}: {int_str} is not a valid integer")


def validate_bool(json: Dict, key: str) -> ResultWithData[bool]:
    if key not in json:
        return get_result_with_error(f"Missing {key}")

    bool_str = json[key]
    try:
        val = bool(bool_str)
        return get_result_with_data(val)
    except ValueError:
        return get_result_with_error(f"Error in {key}: {bool_str} is not a valid boolean")


def validate_list(json: Dict, key: str) -> ResultWithData[List]:
    if key not in json:
        return get_result_with_error(f"Missing {key}")

    value = json[key]
    if type(value) is not list:
        return get_result_with_error(f"{key} must be a list")

    return get_result_with_data(value)


def validate_dict(json: Dict, key: str) -> ResultWithData[Dict]:
    if key not in json:
        return get_result_with_error(f"Missing {key}")

    value = json[key]
    if type(value) is not dict:
        return get_result_with_error(f"{key} must be an object")

    return get_result_with_data(value)
