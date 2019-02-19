import { deleteRequest } from "../utils/api";
import { SONGS_ENDPOINT } from "../utils/endpoints";

export function deleteSong(song) {
    return deleteRequest(SONGS_ENDPOINT + song);
}
