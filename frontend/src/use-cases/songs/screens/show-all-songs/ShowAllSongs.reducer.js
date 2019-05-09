import {
    APP_LOAD_CURRENT_SONG_SUCCEEDED,
    APP_LOAD_CURRENT_SONG_FAILED
} from "./ShowAllSongs.actions";

export default {
    app
};

export function app(state = {}, action) {
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
        default:
            return state;
    }
}
