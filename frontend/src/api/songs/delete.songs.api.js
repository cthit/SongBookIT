import { deleteRequest } from "../utils/api";
import { SONGS_ENDPOINT } from "../utils/endpoints";

export function deleteSong(songId) {
    return deleteRequest(SONGS_ENDPOINT + songId);
}
