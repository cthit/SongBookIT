import React from "react";
import { useHistory } from "react-router-dom";
import {
    DigitButton,
    DigitGammaActions,
    DigitLayout,
    DigitDesign,
    DigitText,
    useDigitTranslations,
    useGammaMe
} from "@cthit/react-digit-components";
import useAdmin from "../../../common/hooks/use-admin";
import { AccountCircle } from "@material-ui/icons";
import { signoutFromSongbook } from "../../../api/gamma-signout/post.gamma-signout.api";
import { BASE_ROUTE, navCreateSong } from "../../App.routes";
import { downloadSongbook } from "../../../api/download-songbook/get.download-songbook.api";

const Header = ({ loading, signIn }) => {
    const history = useHistory();
    const user = useGammaMe();
    const admin = useAdmin();
    const [text] = useDigitTranslations();

    return (
        <DigitLayout.Row
            flex={"1"}
            alignItems={"center"}
            justifyContent={"space-between"}
        >
            <DigitDesign.Link to={BASE_ROUTE}>
                <DigitText.Title text={"Songbook"} />
            </DigitDesign.Link>

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
                    downloadSongbook: text.DownloadSongbook
                }}
                customOptionsOnClick={item => {
                    if (item === "addSong") {
                        navCreateSong(history);
                    } else if (item === "downloadSongbook") {
                        downloadSongbook();
                    }
                }}
                customOrder={
                    admin
                        ? [
                              "addSong",
                              "downloadSongbook",
                              "viewAccount",
                              "signOut"
                          ]
                        : ["downloadSongbook", "viewAccount", "signOut"]
                }
                signOut={signoutFromSongbook}
                frontendUrl={window.ENV.REACT_APP_GAMMA_FRONTEND_URL}
                backendUrl={window.ENV.REACT_APP_GAMMA_BACKEND_URL}
            />
        </DigitLayout.Row>
    );
};

export default Header;
