import React from "react";
import {
    DigitButton,
    DigitGammaActions,
    DigitHeader,
    DigitProviders,
    useGamma,
    useGammaMe,
    DigitLayout,
    DigitText,
} from "@cthit/react-digit-components";

import { useHistory } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import { StateProvider, InitialState, Reducer } from "./App.context";
import Songs from "../use-cases/songs";
import CreateSong from "../use-cases/songs/create-song";
import EditSong from "../use-cases/songs/edit-song"
import useAdmin from "../common/hooks/useAdmin";
import { AccountCircle } from "@material-ui/icons";

const App = () => {
    const [loading, err , signIn] = useGamma("/api/me", "/api/auth", false);
    console.log("wassload", loading)
    console.log("wasserr", err)
    console.log("wasssign", signIn)
    return (
        <DigitProviders>
            <StateProvider initialState={InitialState} reducer={Reducer}>
                <DigitHeader
                    title="SongBook"
                    headerRowProps={{
                        flex: "1",
                        justifyContent: "space-between"
                    }}
                    renderHeader={() => <Header loading={loading} signIn={signIn} />}
                    renderMain={() => (
                        <Switch>
                            <Route
                                path="/songs/create"
                                exact
                                component={CreateSong}
                            />
                            <Route
                                path="/songs/edit/:song_id"
                                exact
                                component={EditSong} />
                            <Redirect from='/songs/edit/' to='/' exact />

                            <Route
                                path="/songs/:song_id?"
                                exact
                                component={Songs} />
                            <Redirect from='/' to='/songs/'  />
                        </Switch>
                    )}
                />
            </StateProvider>
        </DigitProviders>
    );
};

const Header = ({ loading, signIn }) => {
    const history = useHistory();
    const user = useGammaMe();
    const admin = useAdmin();

    console.log("signin", signIn)

    return (
        <DigitLayout.Row
            flex={"1"}
            alignItems={"center"}
            justifyContent={"flex-end"}
        >
            {!loading && user == null && (
                <DigitButton
                    outlined
                    text={"Sign in with gamma"}
                    startIcon={<AccountCircle />}
                    onClick={signIn}
                />
            )}
            <DigitGammaActions
                customOptionsOnClick={item =>
                    item === "adminSongs"
                        ? history.push("/admin/songs")
                        : null
                }
                customOptions={{
                    adminSongs: "Administrate songs"
                }}
                customOrder={
                    admin
                        ? ["adminSongs", "viewAccount", "signOut"]
                        : ["viewAccount", "signOut"]
                }
                size={{ width: "min-content" }}
            />
        </DigitLayout.Row>
    );
};



export default App;
