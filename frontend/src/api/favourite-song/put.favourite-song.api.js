import { putRequest } from "../utils/api";
import { FAVOURITE_ENDPOINT } from "../utils/endpoints";

export function addFavouriteSong(song_id) {
    return putRequest(FAVOURITE_ENDPOINT + song_id, {});
}
