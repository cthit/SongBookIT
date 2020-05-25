import React, { createContext, useContext, useReducer } from "react";
import { getSongs } from "../api/songs/get.songs.api";
import { deleteSong } from "../api/songs/delete.songs.api";

// Explanation of how it works can be found in the link below:
// https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c
export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

export const StateActions = {
    getSongs: "GET_SONGS",
    deleteSong: "DELETE_SONG",
    filterSearch: "FILTER_SEARCH",
    filterTags: "FILTER_TAGS",
};

export const InitialState = {
    songs: [],
    tags: [],
    filterTags: [],
    filterSearch: "",
    getSongs: getSongs,
    deleteSong: deleteSong,
};

export const Reducer = (state, action) => {
    switch (action.type) {
        case StateActions.getSongs:
            return {
                ...state,
                filteredSongs: action.songs,
                songs: action.songs,
                tags: action.tags,
            };
        case StateActions.filterSearch:
            return {
                ...state,
                filterSearch: action.search,
            };
        case StateActions.filterTags:
            return {
                ...state,
                filterTags: action.tags,
            };
        default:
            console.log("default");
    }
    return state;
};
