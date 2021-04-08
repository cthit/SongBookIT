import React from "react";
import { Route, Switch } from "react-router-dom";
import ViewSongs from "./screens/view-songs";
import { BASE_ROUTE } from "../../app/App.routes";
import FourZeroFour from "../../common/components/four-zero-four";

const Songs = () => (
    <Switch>
        <Route path={BASE_ROUTE + ":song_id?"} exact component={ViewSongs} />
        <Route component={FourZeroFour} />
    </Switch>
);

export default Songs;
