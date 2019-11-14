import React from "react";
import { Switch, Route } from "react-router-dom";
import { DigitHeader } from "@cthit/react-digit-components";
import Songs from "../use-cases/songs";
import { StateProvider } from "./App.context";

import { getSongs } from "../api/songs/get.songs.api";

const App = () => {
    const initialState = {
        songs: [],
        getSongs: getSongs,
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case getSongs:
                return {
                    ...state,
                    songs: action.songs,
                };

            default:
                console.log("default");
        }
        return state;
    };

    return (
        <StateProvider initialState={initialState} reducer={reducer}>
            <DigitHeader
                title="SongBook"
                renderMain={() => (
                    <Switch>
                        <Route path="/" component={Songs} />
                    </Switch>
                )}
                // renderHeader={() => {}}
            />
        </StateProvider>
    );
};

export default App;
