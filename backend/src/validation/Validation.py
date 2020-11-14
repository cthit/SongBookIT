from typing import Dict, List
from uuid import UUID
from ResultWithData import ResultWithData, get_result_with_data, get_result_with_error


def validate_str(json: Dict, key: str) -> ResultWithData[str]:
    if key not in json:
        return get_result_with_error("Missing {0}".format(key))

    str_str = json[key]
    if isinstance(str_str, str):
        return get_result_with_data(str_str)
    else:
        get_result_with_error(f"{str_str} is not a string")


def validate_id(id_str: str) -> ResultWithData[UUID]:
    try:
        return get_result_with_data(UUID(id_str))
    except ValueError:
        return get_result_with_error("Invalid id format")


def validate_id_key(json: Dict, key: str) -> ResultWithData[UUID]:
    if key not in json:
        return get_result_with_error("Missing {0}".format(key))
    id_str = json[key]

    return validate_id(id_str)


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

