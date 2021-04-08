import React from "react";
import {
    DigitButton,
    DigitNavLink,
    useDigitTranslations,
    DigitGammaActions,
    DigitLayout,
    useGammaMe,
    DigitText
} from "@cthit/react-digit-components";
import {
    downloadSongbookMD,
    downloadSongbookPDF
} from "../../../api/download-songbook/get.download-songbook.api";
import {
    BASE_ROUTE,
    ADMIN_SONGS_CREATE_ROUTE,
    ADMIN_TAGS_ROUTE
} from "../../App.routes";
import { AccountCircle } from "@material-ui/icons";
import { signoutFromSongbook } from "../../../api/gamma-signout/post.gamma-signout.api";
import useAdmin from "../../../common/hooks/use-admin";
import styled from "styled-components";
import ThinDivider from "../../../common/components/thin-divider";

const DrawerTitle = styled.div`
    background-color: #2196f3;
    display: grid;
    place-items: center;
    border-bottom: 1px solid gray;
    height: 63px;
`;

const DrawerHeadingDiv = styled.div`
    margin-left: 5px;
`;

const DrawerHeading = ({ t }) => (
    <DrawerHeadingDiv>
        <DigitText.Heading6 text={t} />
    </DrawerHeadingDiv>
);

export const Drawer = ({ closeDrawer, loading, signIn }) => {
    const user = useGammaMe();
    const admin = useAdmin();
    const [text] = useDigitTranslations();

    return (
        <>
            <DrawerTitle>
                <DigitText.Title text={"Songbook"} white />
            </DrawerTitle>
            <DigitLayout.Column flex={"1"} justifyContent={"space-between"}>
                <DigitLayout.Column>
                    <DrawerHeading t={text.Pages} />
                    <DigitNavLink
                        text={text.Songs}
                        to={BASE_ROUTE}
                        onClick={closeDrawer}
                    />
                    {admin && (
                        <>
                            <DrawerHeading t={text.AdminPages} />
                            <DigitNavLink
                                text={text.AddSong}
                                link={ADMIN_SONGS_CREATE_ROUTE}
                                onClick={closeDrawer}
                            />
                            <DigitNavLink
                                text={text.HandleTags}
                                link={ADMIN_TAGS_ROUTE}
                                onClick={closeDrawer}
                            />
                        </>
                    )}
                </DigitLayout.Column>
                <DigitLayout.Column>
                    <DrawerHeading t={text.DownloadSongbook} />
                    <DigitButton
                        outlined
                        text={text.DownloadSongbookMD}
                        onClick={downloadSongbookMD}
                    />
                    <DigitButton
                        outlined
                        text={text.DownloadSongbookPDF}
                        onClick={downloadSongbookPDF}
                    />

                    <ThinDivider />

                    <>
                        {!loading && user == null && (
                            <DigitButton
                                outlined
                                text={text.SignInWithGamma}
                                startIcon={<AccountCircle />}
                                onClick={signIn}
                            />
                        )}
                        <div style={{ overflowX: "auto" }}>
                            <DigitGammaActions
                                margin={{ bottom: "5px" }}
                                signOut={signoutFromSongbook}
                                frontendUrl={
                                    window.ENV.REACT_APP_GAMMA_FRONTEND_URL
                                }
                                backendUrl={
                                    window.ENV.REACT_APP_GAMMA_BACKEND_URL
                                }
                            />
                        </div>
                    </>
                </DigitLayout.Column>
            </DigitLayout.Column>
        </>
    );
};
