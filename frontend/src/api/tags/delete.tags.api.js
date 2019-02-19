import { deleteRequest } from "../utils/api";
import { TAGS_ENDPOINT } from "../utils/endpoints";

export function deleteTag(tag) {
    return deleteRequest(TAGS_ENDPOINT + tag);
}
