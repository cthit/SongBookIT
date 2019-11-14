import React from "react";
import { Switch, Route } from "react-router-dom";
import { DigitHeader } from "@cthit/react-digit-components";
import Songs from "../use-cases/songs";

const App = () => (
    <DigitHeader
        title="SongBook"
        renderMain={() => (
            <Switch>
                <Route path="/" component={Songs} />
            </Switch>
        )}
        renderHeader={() => {}}
    />
);

export default App;
