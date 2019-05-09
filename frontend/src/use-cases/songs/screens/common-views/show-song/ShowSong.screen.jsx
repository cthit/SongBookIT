import React from "react";
import { Link } from "react-router-dom";
import {
    DigitLayout,
    DigitDesign,
    DigitMarkdown,
    DigitText
} from "@cthit/react-digit-components";

export const ShowSong = ({ author, melody, song_id, tags, text, title }) => (
    <DigitLayout.Fill padding="20px">
        <DigitDesign.Card
            minWidth="300px"
            maxWidth="800px"
            minHeight="300px"
            maxHeight="500px"
        >
            <DigitDesign.CardBody>
                <Link to={"/" + song_id}>
                    <DigitText.Title text={title} />
                </Link>
                <DigitMarkdown markdownSource={text.slice(0, 150) + "..."} />
                <p> {melody}</p>
                <p> {author}</p>
            </DigitDesign.CardBody>
        </DigitDesign.Card>
    </DigitLayout.Fill>
);

export default ShowSong;
