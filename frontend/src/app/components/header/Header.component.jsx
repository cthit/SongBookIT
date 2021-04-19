import React from "react";
import {
    DigitLayout,
    DigitDesign,
    DigitText,
    DigitButton,
    DigitGammaActions,
    useGammaMe,
    useDigitTranslations
} from "@cthit/react-digit-components";
import { BASE_ROUTE } from "../../App.routes";
import { AccountCircle } from "@material-ui/icons";
import { signoutFromSongbook } from "../../../api/gamma-signout/post.gamma-signout.api";
import useAdmin from "../../../common/hooks/use-admin";

const Header = ({ loading, signIn }) => {
    const [text] = useDigitTranslations();
    const user = useGammaMe();

    return (
        <DigitLayout.Row
            flex={"1"}
            alignItems={"center"}
            justifyContent={"space-between"}
        >
            <DigitDesign.Link to={BASE_ROUTE}>
                <DigitText.Title text={"Songbook"} />
            </DigitDesign.Link>

            <>
                {!loading && user == null && (
                    <DigitButton
                        outlined
                        text={text.SignInWithGamma}
                        startIcon={<AccountCircle />}
                        onClick={signIn}
                    />
                )}
                <DigitGammaActions
                    margin={{ bottom: "5px" }}
                    signOut={signoutFromSongbook}
                    frontendUrl={window.ENV.REACT_APP_GAMMA_FRONTEND_URL}
                    backendUrl={window.ENV.REACT_APP_GAMMA_BACKEND_URL}
                />
            </>
        </DigitLayout.Row>
    );
};

export default Header;
