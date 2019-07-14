import {
    APP_LOAD_CURRENT_SONG_FAILED,
    APP_LOAD_SONGS_SUCCEEDED,
    APP_LOAD_SONGS_FAILED,
    APP_LOAD_CURRENT_SONG_SUCCEEDED
} from "./ShowAllSongs.actions";
import { getSong, getSongs } from "../../../../api/songs/get.songs.api";

export function appLoadCurrentSong(id) {
    return dispatch => {
        getSong(id)
            .then(response => {
                const song = response.data.Song[id];
                dispatch(appLoadCurrentSongSucceeded(song));
            })
            .catch(function(error) {
                dispatch(appLoadCurrentSongFailed(error));
            });
    };
}

export function appLoadSongs() {
    return dispatch => {
        getSongs()
            .then(response => {
                const songs = Object.values(response.data.Song);
                const tags = Object.values(response.data.Tag);
                dispatch(appLoadSongsSucceeded(tags, songs));
            })
            .catch(function(error) {
                dispatch(appLoadSongsFailed(error));
            });
    };
}

function appLoadCurrentSongFailed(error) {
    return {
        type: APP_LOAD_CURRENT_SONG_FAILED,
        payload: {
            error: error
        },
        error: true
    };
}

function appLoadCurrentSongSucceeded(song) {
    return {
        type: APP_LOAD_CURRENT_SONG_SUCCEEDED,
        payload: {
            currentSong: song
        },
        error: false
    };
}

function appLoadSongsSucceeded(tags, songs) {
    return {
        type: APP_LOAD_SONGS_SUCCEEDED,
        payload: {
            tags: tags,
            songs: songs
        },
        error: false
    };
}

function appLoadSongsFailed(error) {
    return {
        type: APP_LOAD_SONGS_FAILED,
        payload: {
            error: error
        },
        error: true
    };
}
