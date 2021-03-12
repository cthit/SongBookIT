import React, {createContext, useContext, useReducer} from "react";

// Explanation of how it works can be found in the link below:
// https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c
export const FilterSongsContext = createContext();

export const FilterSongsProvider = ({reducer, initialState, children}) => (
    <FilterSongsContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </FilterSongsContext.Provider>
);

export const FilterSongsActions = {
    SET_FILTER_SEARCH: "FILTER_SEARCH",
    SET_FILTER_TAGS: "FILTER_TAGS",
};

export const InitialFilterSongsState = {
    filterTags: [],
    filterSearch: "",
};

export const FilterSongsReducer = (state, action) => {
    switch (action.type) {
        case FilterSongsActions.SET_FILTER_SEARCH:
            return {
                ...state,
                filterSearch: action.search
            };
        case FilterSongsActions.SET_FILTER_TAGS:
            return {
                ...state,
                filterTags: action.tags
            };
    }
    return state;
};

export const useFilterSongs = () => useContext(FilterSongsContext)

