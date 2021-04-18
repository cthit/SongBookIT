import { putRequest } from "../utils/api";
import { FAVORITE_ENDPOINT } from "../utils/endpoints";

export function addFavoriteSong(song_id) {
    return putRequest(FAVORITE_ENDPOINT + song_id, {});
}
