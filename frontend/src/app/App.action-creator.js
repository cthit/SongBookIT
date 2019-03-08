import { APP_LOAD_SONGS_SUCCEEDED, APP_LOAD_SONGS_FAILED } from "./App.actions";
import _ from "lodash";
import { getSongs } from "../api/songs/get.songs.api";

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
