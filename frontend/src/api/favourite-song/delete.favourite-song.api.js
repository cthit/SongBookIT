import { deleteRequest } from "../utils/api";
import { FAVOURITE_ENDPOINT } from "../utils/endpoints";

export function deleteFavouriteSong(songId) {
    return deleteRequest(FAVOURITE_ENDPOINT + songId);
}
