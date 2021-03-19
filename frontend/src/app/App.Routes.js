import { removeLastSlash } from "../api/utils/api";

export const BASE_ROUTE = "/";
const SONGS_BASE_ROUTE = "/songs/";
export const SONGS_EDIT_ROUTE = SONGS_BASE_ROUTE + "edit/";
export const SONGS_CREATE_ROUTE = SONGS_BASE_ROUTE + "create/";

export const navHome = history => history.push(removeLastSlash(BASE_ROUTE));

export const navViewSong = (history, song_id) =>
    history.push(removeLastSlash(BASE_ROUTE + song_id));

export const navEditSong = (history, song_id) =>
    history.push(removeLastSlash(SONGS_EDIT_ROUTE + song_id));

export const navCreateSong = history =>
    history.push(removeLastSlash(SONGS_CREATE_ROUTE));
