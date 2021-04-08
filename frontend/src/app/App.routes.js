import { removeLastSlash } from "../api/utils/api";

const ADMIN_ROUTE = "/admin";

const SONGS = "/songs";
const TAGS = "/tags";

const EDIT = "/edit";
const CREATE = "/create";

export const BASE_ROUTE = "/";

export const ADMIN_SONGS_ROUTE = ADMIN_ROUTE + SONGS;
export const ADMIN_SONGS_EDIT_ROUTE = ADMIN_SONGS_ROUTE + EDIT;
export const ADMIN_SONGS_CREATE_ROUTE = ADMIN_SONGS_ROUTE + CREATE;

export const ADMIN_TAGS_ROUTE = ADMIN_ROUTE + TAGS;
export const ADMIN_TAGS_EDIT_ROUTE = ADMIN_TAGS_ROUTE + EDIT;
export const ADMIN_TAGS_CREATE_ROUTE = ADMIN_TAGS_ROUTE + CREATE;

export const navHome = history => history.push(removeLastSlash(BASE_ROUTE));

export const navViewSong = (history, song_id) =>
    history.push(removeLastSlash(BASE_ROUTE + song_id));

export const navHandleTags = history =>
    history.push(removeLastSlash(ADMIN_TAGS_ROUTE));
