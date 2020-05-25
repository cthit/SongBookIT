import React from "react";
import { DigitHeader, DigitProviders, useGamma, useGammaMe } from "@cthit/react-digit-components";
import {Switch, Route} from "react-router-dom";
import { StateProvider, InitialState, Reducer } from "./App.context";
import Songs from "../use-cases/songs";
import CreateSong from "../use-cases/create-song";

const App = () => {
    useGamma();
    const me = useGammaMe();

    console.log(me);

    return (
        <DigitProviders>
            <StateProvider initialState={InitialState} reducer={Reducer}>
                <DigitHeader
                    title="SongBook"
                    renderMain={() => (
                        <Switch>
                            <Route
                                path="/create"
                                exact
                                component={CreateSong}
                            />
                            <Route path="/edit/:id" exact component={Songs} />
                            <Route path="/" exact component={Songs} />
                        </Switch>
                    )}
                />
            </StateProvider>
        </DigitProviders>
    );
};

export default App;
