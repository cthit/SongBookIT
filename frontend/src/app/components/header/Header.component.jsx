import { useHistory } from "react-router-dom";
import {
    DigitButton,
    DigitGammaActions,
    DigitLayout,
    DigitText,
    useDigitTranslations,
    useGammaMe
} from "@cthit/react-digit-components";
import useAdmin from "../../../common/hooks/use-admin";
import { AccountCircle } from "@material-ui/icons";
import { signoutFromSongbook } from "../../../api/gamma-signout/post.gamma-signout.api";
import React from "react";
import { navCreateSong, navHome } from "../../App.routes";

const Header = ({ loading, signIn }) => {
    const history = useHistory();
    const user = useGammaMe();
    const admin = useAdmin();
    const [text] = useDigitTranslations();

    const backendUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:8081/api"
            : "https://gamma.chalmers.it/api";

    return (
        <DigitLayout.Row
            flex={"1"}
            alignItems={"center"}
            justifyContent={"space-between"}
        >
            <DigitText.Title
                text={"Songbook"}
                style={{ cursor: "pointer" }}
                onClick={() => navHome(history)}
            />

            {!loading && user == null && (
                <DigitButton
                    outlined
                    text={text.SignInWithGamma}
                    startIcon={<AccountCircle />}
                    onClick={signIn}
                />
            )}
            <DigitGammaActions
                customOptions={{
                    addSong: text.AddSong,
                    customSignOut: text.SignOut //This should be unnecessary but the prop SignOut didn't work when I tried
                }}
                customOptionsOnClick={item => {
                    if (item === "addSong") {
                        navCreateSong(history);
                    } else if (item === "customSignOut") {
                        signoutFromSongbook();
                        window.location.href = backendUrl + "/logout";
                    }
                }}
                customOrder={
                    admin
                        ? ["addSong", "viewAccount", "customSignOut"]
                        : ["viewAccount", "customSignOut"]
                }
                signOut={a => a} // not used but defined so that GammaActions doesn't complain
                size={{ width: "min-content" }}
                frontendUrl={
                    process.env.NODE_ENV === "development"
                        ? "http://localhost:3000"
                        : "https://gamma.chalmers.it"
                }
                backendUrl={backendUrl}
            />
        </DigitLayout.Row>
    );
};

export default Header;
