import { putRequest } from "../utils/api";
import { TAGS_ENDPOINT } from "../utils/endpoints";

export function editTag(tagId, tag) {
    return putRequest(TAGS_ENDPOINT + tagId, tag);
}
