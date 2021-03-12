import React, {createContext, useCallback, useContext, useReducer} from "react";
import {getSongs} from "../../../api/songs/get.songs.api";

// Explanation of how it works can be found in the link below:
// https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c
export const SongTagContext = createContext();

export const SongTagProvider = ({reducer, initialState, children}) => (
    <SongTagContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </SongTagContext.Provider>
);

export const SongTagActions = {
    LOAD_SONGS_TAGS: "LOAD_SONGS_TAGS",
    LOADING: "LOADING"
};

export const InitialSongTagState = {
    songs: [],
    tags: [],
    loading: false
};

export const SongTagReducer = (state, action) => {
    switch (action.type) {
        case SongTagActions.LOADING:
            return {
                ...state,
                loading: true
            }

        case SongTagActions.LOAD_SONGS_TAGS:
            return {
                ...state,
                songs: action.songs,
                tags: action.tags,
                loading: false
            };
    }
    return state;
};

export const useSongTag = () => {
    const [{songs, tags, loading}, dispatch] = useContext(SongTagContext)

    const loadSongs = () => {
        if (!loading) {
            dispatch({type: SongTagActions.LOADING})
            getSongs().then(res => {
                dispatch({
                    type: SongTagActions.LOAD_SONGS_TAGS,
                    songs: Object.values(res.data.data.songs).sort((a, b) =>
                        a.number > b.number ? 1 : -1
                    ),
                    tags: Object.values(res.data.data.tags).sort((a, b) =>
                        a.name > b.name ? 1 : -1
                    )
                });
            })
        }
    }


    return {songs: songs, tags: tags, loading: loading, loadSongs: loadSongs}


}
