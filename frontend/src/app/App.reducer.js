import { APP_LOAD_SONGS_SUCCEEDED, APP_LOAD_SONGS_FAILED } from "./App.actions";

/** root reducer */
export default {
    app
};

export function app(state = {}, action) {
    switch (action.type) {
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
