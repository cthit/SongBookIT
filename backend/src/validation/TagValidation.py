from typing import Dict

from objects.requestobjects.RequestTagObject import RequestTagObject
from utils.ResultWithData import get_result_with_error, get_result_with_data, ResultWithData
from validation.Validation import validate_str, validate_short_id, validate_required_str


def validate_tag(tag: Dict) -> ResultWithData[RequestTagObject]:
    name_res = validate_required_str(tag, 'name')
    if name_res.is_error:
        return get_result_with_error(name_res.message)

    pretty_name_sv_res = validate_str(tag, 'pretty_name_sv')
    if pretty_name_sv_res.is_error:
        return get_result_with_error(pretty_name_sv_res.message)

    pretty_name_en_res = validate_str(tag, 'pretty_name_en')
    if pretty_name_en_res.is_error:
        return get_result_with_error(pretty_name_en_res.message)

    return get_result_with_data(RequestTagObject(
        tag_id=None,
        name=name_res.data,
        pretty_name_sv=pretty_name_sv_res.data,
        pretty_name_en=pretty_name_en_res.data
    ))


def validate_tag_update(tag: Dict, tag_id: str) -> ResultWithData[RequestTagObject]:
    id_res = validate_short_id(tag_id)
    if id_res.is_error:
        return get_result_with_error(id_res.message)

    valid_tag_res = validate_tag(tag)
    if valid_tag_res.is_error:
        return get_result_with_error(valid_tag_res.message)
    valid_tag = valid_tag_res.data

    return get_result_with_data(RequestTagObject(
        tag_id=tag_id,
        name=valid_tag.name,
        pretty_name_sv=valid_tag.pretty_name_sv,
        pretty_name_en=valid_tag.pretty_name_en
    ))

