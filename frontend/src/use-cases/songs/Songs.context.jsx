import React, { createContext, useContext, useReducer } from "react";

// Explanation of how it works can be found in the link below:
// https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c
export const SongTagContext = createContext();

export const SongTagProvider = ({ reducer, initialState, children }) => (
    <SongTagContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </SongTagContext.Provider>
);

export const useStateValue = () => useContext(SongTagContext);

export const SongTagActions = {
    getSongs: "GET_SONGS",
    filterSearch: "FILTER_SEARCH",
    filterTags: "FILTER_TAGS"
};

export const InitialSongTagState = {
    songs: [],
    tags: [],
    filterTags: [],
    filterSearch: ""
};

export const SongTagReducer = (state, action) => {
    switch (action.type) {
        case SongTagActions.getSongs:
            return {
                ...state,
                songs: action.songs,
                tags: action.tags
            };
        case SongTagActions.filterSearch:
            return {
                ...state,
                filterSearch: action.search
            };
        case SongTagActions.filterTags:
            return {
                ...state,
                filterTags: action.tags
            };
    }
    return state;
};
