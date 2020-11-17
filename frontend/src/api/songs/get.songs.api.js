import { getRequest } from "../utils/api";
import { SONGS_ENDPOINT, SONGS_NUMBERS_ENDPOINT } from "../utils/endpoints";

export function getSongs() {
    return getRequest(SONGS_ENDPOINT);
}

export function getSongByTitle(songTitle) {
    return getRequest(SONGS_ENDPOINT + songTitle);
}

export function getSong(songId) {
    return getRequest(SONGS_ENDPOINT + songId);
}

export function getNbrSong() {
    return getRequest(SONGS_NUMBERS_ENDPOINT)
}