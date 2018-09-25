import { getRequest } from "../utils/api";
import { SONGS_TAG_ENDPOINT } from "../utils/endpoints";

export function getSong(tagId) {
    return getRequest(SONGS_TAG_ENDPOINT + tagId);
}
