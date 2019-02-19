import { getRequest } from "../utils/api";
import { SONGS_TAG_ENDPOINT } from "../utils/endpoints";

export function getSong(tag) {
    return getRequest(SONGS_TAG_ENDPOINT + tag);
}
