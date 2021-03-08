import React from "react";
import { DigitHeader, useGamma } from "@cthit/react-digit-components";
import { Switch, Route, Redirect } from "react-router-dom";
import Songs from "../use-cases/songs";
import Header from "./Elements/Header/Header.element";

const App = () => {
    const [loading, , signIn] = useGamma("/api/me", "/api/auth", false);
    return (
        <DigitHeader
            title="SongBook"
            headerRowProps={{
                flex: "1",
                justifyContent: "space-between"
            }}
            renderCustomHeader={() => (
                <Header loading={loading} signIn={signIn} />
            )}
            renderMain={() => (
                <Switch>
                    <Route path="/songs/" component={Songs} />

                    <Redirect to="/songs/" />
                </Switch>
            )}
        />
    );
};

export default App;
