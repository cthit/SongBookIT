import React from "react";
import { DigitLayout, DigitDesign } from "@cthit/react-digit-components";

export const ShowSong = ({ name, lyrics, melody, author, category }) => (
    <DigitLayout.Fill>
        <DigitDesign.Card minWidth="300px" maxWidth="800px">
            <DigitDesign.CardBody>
                <p> {name}</p>
                <p> {lyrics}</p>
                <p> {melody}</p>
                <p> {author}</p>
                <p> {category}</p>
            </DigitDesign.CardBody>
        </DigitDesign.Card>
    </DigitLayout.Fill>
);

export default ShowSong;
