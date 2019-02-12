import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { DigitHeader } from "@cthit/react-digit-components";
import Songs from "../use-cases/songs";

class App extends Component {
    render() {
        return (
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
    }
}

export default App;
