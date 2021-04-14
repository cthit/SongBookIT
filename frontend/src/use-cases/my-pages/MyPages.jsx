import React from "react";
import { Route, Switch } from "react-router-dom";
import { useGammaMe, useGammaStatus } from "@cthit/react-digit-components";
import InsufficientAccess from "../../common/components/insufficient-access";
import FourZeroFour from "../../common/components/four-zero-four";
import { MY_PAGES_ROUTE } from "../../app/App.routes";
import MeScreen from "./screens/me";

export const MyPages = () => {
    const [loading] = useGammaStatus();
    const user = useGammaMe();

    if (!loading && !user) {
        return <InsufficientAccess />;
    }

    return (
        <Switch>
            <Route path={MY_PAGES_ROUTE} exact component={MeScreen} />
            <Route component={FourZeroFour} />
        </Switch>
    );
};
