import { deleteRequest } from "../utils/api";
import { TAGS_ENDPOINT } from "../utils/endpoints";

export function deleteTag(tagId) {
    return deleteRequest(TAGS_ENDPOINT + tagId);
}
