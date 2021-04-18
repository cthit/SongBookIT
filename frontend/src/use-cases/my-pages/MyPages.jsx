import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useGammaMe, useGammaStatus } from "@cthit/react-digit-components";
import InsufficientAccess from "../../common/components/insufficient-access";
import FourZeroFour from "../../common/components/four-zero-four";
import { MY_PAGES_FAVORITES_ROUTE, MY_PAGES_ROUTE } from "../../app/App.routes";
import MyFavoriteSongs from "./screens/my-favorite-songs";

export const MyPages = () => {
    const [loading] = useGammaStatus();
    const user = useGammaMe();

    if (!loading && !user) {
        return <InsufficientAccess />;
    }

    return (
        <Switch>
            <Redirect
                from={MY_PAGES_ROUTE}
                exact
                to={MY_PAGES_FAVORITES_ROUTE}
            />
            <Route
                path={MY_PAGES_FAVORITES_ROUTE}
                exact
                component={MyFavoriteSongs}
            />
            <Route component={FourZeroFour} />
        </Switch>
    );
};
