import React from "react";
import { Switch, Route } from "react-router-dom";
import { DigitHeader } from "@cthit/react-digit-components";
import Songs from "../use-cases/songs";

const App = () => (
    <div className="App">
        <DigitHeader
            title="SongBook"
            renderMain={() => (
                <Switch>
                    <Route path="/" component={Songs} />
                </Switch>
            )}
            renderDrawer={null}
        />
    </div>
);

export default App;
