import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { DigitHeader } from "@cthit/react-digit-components";
import ListSongs from "../use-cases/songs/";

class App extends Component {
    render() {
        return (
            <div className="App">
                <DigitHeader
                    title="SongBook"
                    renderMain={() => (
                        <Switch>
                            <Route path="/" component={ListSongs} />
                        </Switch>
                    )}
                    // renderDrawer={() => <div/>}
                />
            </div>
        );
    }
}

export default App;
