import React, { createContext, useContext, useReducer } from "react";
import { getSongs } from "../../api/songs/get.songs.api";
import { getTags } from "../../api/tags/get.tags.api";

export const SongTagContext = createContext({});

export const SongTagProvider = ({ reducer, initialState, children }) => (
    <SongTagContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </SongTagContext.Provider>
);

export const SongTagActions = {
    LOAD_SONGS_TAGS: "LOAD_SONGS_TAGS",
    LOAD_TAGS: "LOAD_TAGS",
    LOADING: "LOADING"
};

export const InitialSongTagState = {
    songs: [],
    tags: [],
    loadingSongs: false
};

export const SongTagReducer = (state, action) => {
    switch (action.type) {
        case SongTagActions.LOADING:
            return {
                ...state,
                loadingSongs: true
            };

        case SongTagActions.LOAD_TAGS:
            return {
                ...state,
                tags: action.tags,
                loadingSongs: false
            };

        case SongTagActions.LOAD_SONGS_TAGS:
            return {
                ...state,
                songs: action.songs,
                tags: action.tags,
                loadingSongs: false
            };
    }

    return state;
};

export const useSongTag = () => {
    const [{ songs, tags, loadingSongs }, dispatch] = useContext(
        SongTagContext
    );

    const loadSongs = () => {
        if (!loadingSongs) {
            dispatch({ type: SongTagActions.LOADING });
            getSongs().then(res => {
                const songs = Object.values(res.data.data.songs).sort((a, b) =>
                    a.number > b.number ? 1 : -1
                );
                const tags = Object.values(res.data.data.tags).sort((a, b) =>
                    a.name > b.name ? 1 : -1
                );
                dispatch({
                    type: SongTagActions.LOAD_SONGS_TAGS,
                    songs: songs,
                    tags: tags
                });
            });
        }
    };

    const loadTags = () => {
        if (!loadingSongs) {
            dispatch({ type: SongTagActions.LOADING });
            getTags().then(res => {
                const tags_res = Object.values(res.data.data.tags);
                dispatch({
                    type: SongTagActions.LOAD_TAGS,
                    tags: tags_res
                });
            });
        }
    };

    return { songs, tags, loadingSongs, loadSongs, loadTags };
};
