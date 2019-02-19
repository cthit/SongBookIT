import React from "react";
import { Link } from "react-router-dom";
import { DigitLayout, DigitDesign } from "@cthit/react-digit-components";

export const ShowSong = ({ author, melody, song_id, tags, text, title }) => (
    <DigitLayout.Fill>
        <DigitDesign.Card minWidth="300px" maxWidth="800px">
            <DigitDesign.CardBody>
                <Link to={"/" + song_id}>
                    <p> {title}</p>
                </Link>
                <p> {text}</p>
                <p> {melody}</p>
                <p> {author}</p>
            </DigitDesign.CardBody>
        </DigitDesign.Card>
    </DigitLayout.Fill>
);

export default ShowSong;
