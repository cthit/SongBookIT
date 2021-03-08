import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CreateSong from "./create-song";
import EditSong from "./edit-song";
import ViewSongs from "./view-songs";
import {
    InitialSongTagState,
    SongTagReducer,
    SongTagProvider
} from "./Songs.context";

const Songs = () => (
    <SongTagProvider
        initialState={InitialSongTagState}
        reducer={SongTagReducer}
    >
        <Switch>
            <Route path="/songs/create" exact component={CreateSong} />
            <Route path="/songs/edit/:song_id" exact component={EditSong} />
            <Redirect from="/songs/edit/" to="/" exact />

            <Route path="/songs/:song_id?" exact component={ViewSongs} />
            <Redirect from="*" to="/songs/" />
        </Switch>
    </SongTagProvider>
);

export default Songs;
