import {
    APP_LOAD_CURRENT_SONG_SUCCEEDED,
    APP_LOAD_CURRENT_SONG_FAILED,
    APP_LOAD_SONGS_SUCCEEDED,
    APP_LOAD_SONGS_FAILED
} from "./ShowAllSongs.actions";

export default {
    songsReducer
};

export function songsReducer(state = {}, action) {
    switch (action.type) {
        case APP_LOAD_CURRENT_SONG_SUCCEEDED:
            return {
                ...state,
                ...action.payload
            };

        case APP_LOAD_CURRENT_SONG_FAILED:
            return {
                ...state,
                error: true
            };
        case APP_LOAD_SONGS_SUCCEEDED:
            return {
                ...state,
                ...action.payload
            };

        case APP_LOAD_SONGS_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
}
