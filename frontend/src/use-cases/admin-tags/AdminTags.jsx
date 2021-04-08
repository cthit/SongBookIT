import React from "react";
import { Route, Switch } from "react-router-dom";
import {
    ADMIN_SONGS_CREATE_ROUTE,
    ADMIN_SONGS_EDIT_ROUTE,
    ADMIN_TAGS_CREATE_ROUTE,
    ADMIN_TAGS_EDIT_ROUTE,
    ADMIN_TAGS_ROUTE
} from "../../app/App.routes";
import FourZeroFour from "../../common/components/four-zero-four";
import InsufficientAccess from "../../common/components/insufficient-access/";
import { useGammaStatus } from "@cthit/react-digit-components";
import useAdmin from "../../common/hooks/use-admin";
import HandleTagsScreen from "./screens/handle-tags/HandleTags.screen";
import CreateTag from "./screens/create-tag";
import EditTag from "./screens/edit-tag";

const AdminTags = () => {
    const [loading] = useGammaStatus();
    const admin = useAdmin();

    if (!loading && !admin) {
        return <InsufficientAccess />;
    }

    return (
        <Switch>
            <Route path={ADMIN_TAGS_CREATE_ROUTE} exact component={CreateTag} />
            <Route
                path={ADMIN_TAGS_EDIT_ROUTE + "/:tag_id?"}
                exact
                component={EditTag}
            />
            <Route path={ADMIN_TAGS_ROUTE} exact component={HandleTagsScreen} />
            <Route component={FourZeroFour} />
        </Switch>
    );
};

export default AdminTags;
