import React from "react";
import { DigitLayout, DigitDesign } from "@cthit/react-digit-components";
import styled from "styled-components";

const FooterText = styled.p`
    font-family: Roboto Thin, sans-serif;
    font-size: 0.875em;
    margin-right: auto;
    margin-left: auto;
`;

const FooterContainer = styled.footer`
    margin-left: -16px;
    margin-right: -16px;
    margin-bottom: -16px;
    padding-bottom: 8px;
    left: 0;
    right: 0;
`;

export const Footer = () => (
    <FooterContainer>
        <DigitLayout.Column justifyContent={"center"}>
            <DigitDesign.Divider style={{ borderColor: "#f6f6f6" }} />
            <FooterText>
                {"made with ❤️ by "}
                <a href={"https://github.com/ericlp/"}>{"LP"}</a>
                {" (digIT'18)"}
            </FooterText>
            <FooterText>
                <a href={"https://github.com/cthit/SongBook/"}>
                    {"Source on Github"}
                </a>
            </FooterText>
        </DigitLayout.Column>
    </FooterContainer>
);
