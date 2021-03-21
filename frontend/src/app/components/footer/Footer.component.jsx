import React from "react";
import { DigitLayout, DigitDesign } from "@cthit/react-digit-components";
import styled from "styled-components";

const FooterText = styled.p`
    font-family: Roboto Thin, sans-serif;
    font-size: 0.875em;
    margin-right: auto;
    margin-left: auto;
`;

export const Footer = () => (
    <footer>
        <DigitLayout.Column justifyContent={"center"}>
            <DigitDesign.Divider style={{ borderColor: "#f8f8f8" }} />
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
    </footer>
);
