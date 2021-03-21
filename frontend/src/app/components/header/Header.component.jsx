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
import React from "react";
import { BASE_ROUTE, navCreateSong } from "../../App.routes";

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
                    addSong: text.AddSong
                }}
                customOptionsOnClick={item => {
                    if (item === "addSong") {
                        navCreateSong(history);
                    }
                }}
                customOrder={
                    admin
                        ? ["addSong", "viewAccount", "signOut"]
                        : ["viewAccount", "signOut"]
                }
                signOut={signoutFromSongbook} // not used but defined so that GammaActions doesn't complain
                size={{ width: "min-content" }}
                frontendUrl={process.env.REACT_APP_GAMMA_FRONTEND_URL}
                backendUrl={process.env.REACT_APP_GAMMA_BACKEND_URL}
            />
        </DigitLayout.Row>
    );
};

export default Header;
