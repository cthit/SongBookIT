import { useHistory } from "react-router-dom";
import {
    DigitButton,
    DigitGammaActions,
    DigitLayout,
    DigitText,
    useGammaMe
} from "@cthit/react-digit-components";
import useAdmin from "../../../common/hooks/use-admin";
import { AccountCircle } from "@material-ui/icons";
import { signoutFromSongbook } from "../../../api/gamma-signout/post.gamma-signout.api";
import React from "react";

const Header = ({ loading, signIn }) => {
    const history = useHistory();
    const user = useGammaMe();
    const admin = useAdmin();

    return (
        <DigitLayout.Row
            flex={"1"}
            alignItems={"center"}
            justifyContent={"space-between"}
        >
            <DigitText.Title
                text={"Songbook"}
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/songs")}
            />

            {!loading && user == null && (
                <DigitButton
                    outlined
                    text={"Sign in"}
                    startIcon={<AccountCircle />}
                    onClick={signIn}
                />
            )}
            <DigitGammaActions
                customOptions={{
                    addSong: "Add a new song"
                }}
                customOptionsOnClick={item => {
                    if (item === "addSong") {
                        history.push("/songs/create");
                    }
                }}
                customOrder={
                    admin
                        ? ["addSong", "viewAccount", "signOut"]
                        : ["viewAccount", "signOut"]
                }
                signOut={signoutFromSongbook}
                size={{ width: "min-content" }}
                frontendUrl={
                    process.env.NODE_ENV === "development"
                        ? "http://localhost:3000"
                        : "https://gamma.chalmers.it"
                }
                backendUrl={
                    process.env.NODE_ENV === "development"
                        ? "http://localhost:8081/api"
                        : "https://gamma.chalmers.it/api"
                }
            />
        </DigitLayout.Row>
    );
};

export default Header;
