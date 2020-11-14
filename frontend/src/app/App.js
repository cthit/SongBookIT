import React from "react";
import { DigitHeader, DigitProviders, useGamma, useGammaMe } from "@cthit/react-digit-components";
import { Switch, Route, Redirect } from "react-router-dom";
import { StateProvider, InitialState, Reducer } from "./App.context";
import Songs from "../use-cases/songs";
import CreateSong from "../use-cases/songs/create-song";
import EditSong from "../use-cases/songs/edit-song"

const App = () => {
    // useGamma();
    // const me = useGammaMe();
    //
    // console.log("GammaMe:", me);

    // TODO: kolla på att fixa link-preview https://stackoverflow.com/questions/56395524/dynamically-add-meta-tags-to-index-html-for-shared-link-previews

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
                            <Route path="/edit/:song_title" exact component={EditSong} />
                            <Redirect from='/edit/' to='/' exact />
                            <Route path="/" exact component={Songs} />
                        </Switch>
                    )}
                />
            </StateProvider>
        </DigitProviders>
    );
};

export default App;
