import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateSong from "./screens/create-song";
import EditSong from "./screens/edit-song";
import {
    ADMIN_SONGS_CREATE_ROUTE,
    ADMIN_SONGS_EDIT_ROUTE
} from "../../app/App.routes";
import FourZeroFour from "../../common/components/four-zero-four";
import InsufficientAccess from "../../common/components/insufficient-access/";
import { useGammaStatus } from "@cthit/react-digit-components";
import useAdmin from "../../common/hooks/use-admin";

export const AdminSongs = () => {
    const [loading] = useGammaStatus();
    const admin = useAdmin();

    if (!loading && !admin) {
        return <InsufficientAccess />;
    }

    return (
        <Switch>
            <Route
                path={ADMIN_SONGS_CREATE_ROUTE}
                exact
                component={CreateSong}
            />
            <Route
                path={ADMIN_SONGS_EDIT_ROUTE + "/:song_id?"}
                exact
                component={EditSong}
            />
            <Route component={FourZeroFour} />
        </Switch>
    );
};
