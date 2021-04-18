import { deleteRequest } from "../utils/api";
import { FAVORITE_ENDPOINT } from "../utils/endpoints";

export function deleteFavoriteSong(songId) {
    return deleteRequest(FAVORITE_ENDPOINT + songId);
}
