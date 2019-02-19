import { getRequest } from "../utils/api";
import { TAGS_ENDPOINT } from "../utils/endpoints";

export function getTags() {
    return getRequest(TAGS_ENDPOINT + );
}

export function getTag(id) {
    return getRequest(TAGS_ENDPOINT + id);
}