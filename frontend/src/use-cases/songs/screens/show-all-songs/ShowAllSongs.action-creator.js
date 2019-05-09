import {
    APP_LOAD_CURRENT_SONG_FAILED,
    APP_LOAD_CURRENT_SONG_SUCCEEDED
} from "./ShowAllSongs.actions";
import _ from "lodash";
import { getSong } from "../../../../api/songs/get.songs.api";

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

function appLoadCurrentSongSucceeded(song) {
    return {
        type: APP_LOAD_CURRENT_SONG_SUCCEEDED,
        payload: {
            currentSong: song
        },
        error: false
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
