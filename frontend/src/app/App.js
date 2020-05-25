import React from "react";
import {Switch, Route} from "react-router-dom";
import {DigitHeader, DigitProviders} from "@cthit/react-digit-components";
import Songs from "../use-cases/songs";
import {StateProvider, InitialState, Reducer} from "./App.context";

const App = () => {
    return (
        <DigitProviders>

            <StateProvider initialState={InitialState} reducer={Reducer}>
                <DigitHeader
                    title="SongBook"
                    renderMain={() => (
                        <Switch>
                            <Route path="/" component={Songs}/>
                            <Route path="/edit/:id" component={Songs}/>
                            <Route path="/create" component={Songs}/>
                        </Switch>
                    )}
                />
            </StateProvider>
        </DigitProviders>
    );
};

export default App;
