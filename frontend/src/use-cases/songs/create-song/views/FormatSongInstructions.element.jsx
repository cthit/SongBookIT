import React from "react"
import {DigitDesign, DigitMarkdown, useDigitTranslations} from "@cthit/react-digit-components"
import styled from "styled-components"

const Sticky = styled.div`
  position: sticky;
  width: 100%;
  height: auto;

`;

const Desktop = styled.div`
  @media (max-width: 1280px) {
    display: none;
  }
`;

export const FormatSongInstructions = () => {
    const [text] = useDigitTranslations()
    return (
        <Desktop>
            <Sticky>
                <DigitDesign.Card size={{width: "100%", height: "auto", maxWidth: "450px"}} margin={{right: "auto"}}>
                    <DigitDesign.CardBody>
                        <DigitMarkdown markdownSource={text.FormatSong}/>
                    </DigitDesign.CardBody>
                </DigitDesign.Card>
            </Sticky>
        </Desktop>)

}
