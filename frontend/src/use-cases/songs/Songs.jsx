import React from "react";
import { Switch, Route } from "react-router-dom";
import ShowSongs from "./screens/show-songs";

class Songs extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={ShowSongs} />
            </Switch>
        );
    }
}

export default Songs;
