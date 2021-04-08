import { putRequest } from "../utils/api";
import { SONGS_ENDPOINT } from "../utils/endpoints";

export function editSong(songId, song) {
    return putRequest(SONGS_ENDPOINT + songId, song);
}
