import React, { useEffect } from "react";
import {
    DigitHeader,
    useDigitTranslations,
    useGamma,
    useGammaMe
} from "@cthit/react-digit-components";
import { Route, Switch } from "react-router-dom";
import Songs from "../use-cases/songs";
import Header from "./components/header/Header.component";
import translations from "./App.translations";
import { BASE_ROUTE } from "./App.routes";
import { GAMMA_AUTH_ENDPOINT, GAMMA_ME_ENDPOINT } from "../api/utils/endpoints";
import { Footer } from "./components/footer/Footer.component";
import styled from "styled-components";

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

    return (
        <DigitHeader
            renderCustomHeader={() => (
                <Header loading={loading} signIn={signIn} />
            )}
            renderMain={() => (
                <ScreenContainer>
                    <Switch>
                        <Route from={BASE_ROUTE} component={Songs} />
                    </Switch>
                    <Footer />
                </ScreenContainer>
            )}
        />
    );
};

export default App;
