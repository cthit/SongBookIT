import React, { lazy, useEffect, Suspense } from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import {
    DigitHeaderDrawer,
    useDigitTranslations,
    useGamma,
    useGammaMe
} from "@cthit/react-digit-components";
import {
    ADMIN_SONGS_ROUTE,
    ADMIN_TAGS_ROUTE,
    BASE_ROUTE,
    MY_PAGES_ROUTE
} from "./App.routes";
import { GAMMA_AUTH_ENDPOINT, GAMMA_ME_ENDPOINT } from "../api/utils/endpoints";
import translations from "./App.translations";
import Header from "./components/header";
import Footer from "./components/footer";
import Drawer from "./components/drawer";
import { SongTagProvider } from "./Songs.context";
import CenterLoading from "../common/components/center-loading";

const ScreenContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-between;
    flex-direction: column;
`;

const getUserLanguage = user => {
    let language = user == null ? null : user.language;

    if (language == null) {
        language = localStorage.getItem("language");
    }

    if (language == null) {
        language = "en";
    }

    return language;
};

const App = () => {
    const [loading, , signIn] = useGamma(
        GAMMA_ME_ENDPOINT,
        GAMMA_AUTH_ENDPOINT,
        false
    );

    const [
        ,
        ,
        setActiveLanguage,
        setCommonTranslations
    ] = useDigitTranslations();

    const user = useGammaMe();
    const userLanguage = getUserLanguage(user);

    useEffect(() => {
        setActiveLanguage(userLanguage);
    }, [setActiveLanguage, userLanguage]);

    useEffect(() => localStorage.setItem("language", userLanguage), [
        userLanguage
    ]);

    useEffect(() => {
        setCommonTranslations(translations);
    }, [setCommonTranslations]);

    const AdminSongs = lazy(() => import("../use-cases/admin-songs/"));
    const AdminTags = lazy(() => import("../use-cases/admin-tags/"));
    const BrowseSongs = lazy(() => import("../use-cases/browse-songs"));
    const MyPages = lazy(() => import("../use-cases/my-pages"));

    return (
        <SongTagProvider>
            <DigitHeaderDrawer
                renderCustomHeader={() => <Header />}
                disableResponsive
                renderDrawer={closeDrawer => (
                    <Drawer
                        closeDrawer={closeDrawer}
                        loading={loading}
                        signIn={signIn}
                    />
                )}
                renderMain={() => (
                    <ScreenContainer>
                        <Suspense fallback={<CenterLoading />}>
                            <Switch>
                                <Route
                                    from={ADMIN_SONGS_ROUTE}
                                    component={AdminSongs}
                                />
                                <Route
                                    from={ADMIN_TAGS_ROUTE}
                                    component={AdminTags}
                                />
                                <Route
                                    from={MY_PAGES_ROUTE}
                                    component={MyPages}
                                />
                                <Route
                                    from={BASE_ROUTE}
                                    component={BrowseSongs}
                                />
                            </Switch>
                        </Suspense>
                        <Footer />
                    </ScreenContainer>
                )}
            />
        </SongTagProvider>
    );
};

export default App;
