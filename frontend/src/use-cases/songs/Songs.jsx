import React from "react";
import { Switch, Route } from "react-router-dom";
import ShowAllSongs from "./screens/show-all-songs";
import ShowSongDetails from "./screens/show-song-detail";

class Songs extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={ShowAllSongs} />
                <Route path="/:id" exact component={ShowSongDetails} />
                {/*<Route path="/:id/edit" exact component={EditSong} />*/}
                {/*<Route path="/add" exact component={AddSong} />*/}
            </Switch>
        );
    }
}

export default Songs;
