import React from "react";
import { DigitLayout } from "@cthit/react-digit-components";
import ShowSong from "../views/show-song";

const songs = [
    {
        name: "----------",
        lyrics: "text som sjungs",
        melody: "melodi för låten",
        author: "vem som skrev låten",
        category: "med vilka låter denna klumpas"
    },
    {
        name: "namn på låten",
        lyrics: "öösdä.öfäsdöf.",
        melody: "melodi för låten",
        author: "vem som skrev låten",
        category: "med vilka låter denna klumpas"
    }
];

const ShowSongs = () => (
    <DigitLayout.Column centerHorizontal alignTop padding="10px">
        <ShowSong song={songs[0]} />
        <ShowSong song={songs[1]} />
    </DigitLayout.Column>
);

export default ShowSongs;
