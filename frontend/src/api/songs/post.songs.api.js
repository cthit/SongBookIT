import { postRequest } from "../utils/api";
import { SONGS_ENDPOINT } from "../utils/endpoints";

export function addSong(song) {
    return postRequest(SONGS_ENDPOINT, song);
}
