import { postRequest } from "../utils/api";
import { TAGS_ENDPOINT } from "../utils/endpoints";

export function addTag(tag) {
    return postRequest(TAGS_ENDPOINT, tag);
}
