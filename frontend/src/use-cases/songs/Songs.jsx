import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateSong from "./screens/create-song";
import EditSong from "./screens/edit-song";
import ViewSongs from "./screens/view-songs";
import { SongTagProvider } from "./Songs.context";
import {
    BASE_ROUTE,
    SONGS_CREATE_ROUTE,
    SONGS_EDIT_ROUTE
} from "../../app/App.routes";
import FourZeroFour from "../../common/components/four-zero-four";

const Songs = () => (
    <SongTagProvider>
        <Switch>
            <Route path={SONGS_CREATE_ROUTE} exact component={CreateSong} />
            <Route
                path={SONGS_EDIT_ROUTE + ":song_id?"}
                exact
                component={EditSong}
            />
            <Route
                path={BASE_ROUTE + ":song_id?"}
                exact
                component={ViewSongs}
            />
            <Route component={FourZeroFour} />
        </Switch>
    </SongTagProvider>
);

export default Songs;
