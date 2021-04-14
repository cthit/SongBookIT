import React from "react";
import { Route, Switch } from "react-router-dom";
import { BASE_ROUTE } from "../../app/App.routes";
import FourZeroFour from "../../common/components/four-zero-four";
import AllSongs from "./screens/all-songs";
import ViewSong from "./screens/view-song";

export const BrowseSongs = () => (
    <Switch>
        <Route path={BASE_ROUTE + ":song_id?"} exact component={AllSongs} />
        <Route
            path={BASE_ROUTE + "songs/:song_id"}
            exact
            component={ViewSong}
        />
        <Route component={FourZeroFour} />
    </Switch>
);
