import React from "react";
import {Switch, Route} from "react-router-dom";
import CreateSong from "./create-song";
import EditSong from "./edit-song";
import ViewSongs from "./view-songs";
import {
    InitialSongTagState,
    SongTagReducer,
    SongTagProvider
} from "./Songs.context";
import {
    SONGS_CREATE_ROUTE,
    SONGS_EDIT_ROUTE,
    BASE_ROUTE
} from "../../app/App.Routes";
import FourZeroFour from "../../common/elements/FourZeroZero";

const Songs = () => (
    <SongTagProvider
        initialState={InitialSongTagState}
        reducer={SongTagReducer}
    >
        <Switch>
            <Route path={SONGS_CREATE_ROUTE} exact component={CreateSong}/>
            <Route
                path={SONGS_EDIT_ROUTE + "/:song_id?"}
                exact
                component={EditSong}
            />

            <Route
                path={BASE_ROUTE + ":song_id?"}
                exact
                component={ViewSongs}
            />
            <Route component={FourZeroFour}/>
        </Switch>
    </SongTagProvider>
);

export default Songs;
