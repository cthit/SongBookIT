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
import { downloadSongbookMD } from "../../../api/download-songbook/get.download-songbook.api";
import {
    BASE_ROUTE,
    ADMIN_SONGS_CREATE_ROUTE,
    ADMIN_TAGS_ROUTE,
    MY_PAGES_ROUTE
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
    cursor: pointer;
`;

const DrawerHeadingDiv = styled.div`
    margin-left: 5px;
`;

const DrawerHeading = ({ t }) => (
    <DrawerHeadingDiv>
        <DigitText.Heading6 text={t} />
    </DrawerHeadingDiv>
);

export const Drawer = ({ closeDrawer }) => {
    const [text] = useDigitTranslations();
    const user = useGammaMe();
    const admin = useAdmin();

    if (Object.keys(text).length === 0) {
        return null;
    }

    return (
        <>
            <DrawerTitle onClick={closeDrawer}>
                <DigitText.Title text={"Songbook"} white />
            </DrawerTitle>
            <div
                style={{
                    overflowY: "auto",
                    display: "flex",
                    flex: 1,
                    flexDirection: "column"
                }}
            >
                <DrawerHeading t={text.Pages} />
                <DigitNavLink
                    text={text.Songs}
                    link={BASE_ROUTE}
                    onClick={closeDrawer}
                />
                {user && (
                    <DigitNavLink
                        text={text.MyPages}
                        link={MY_PAGES_ROUTE}
                        onClick={closeDrawer}
                    />
                )}
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

                <DrawerHeading t={text.DownloadSongbook} />
                <DigitButton
                    outlined
                    size={{ minHeight: 40 }}
                    text={text.DownloadSongbookMD}
                    onClick={downloadSongbookMD}
                />
            </div>
        </>
    );
};
