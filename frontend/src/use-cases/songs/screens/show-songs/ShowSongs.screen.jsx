import React from "react";
import { DigitLayout } from "@cthit/react-digit-components";
import ShowSong from "../views/show-song";

const songs = [
    {
        name: "Namn på låten",
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
    },
    {
        name: "teckenvisan",
        lyrics: ".,.,/*_\"#-^'{}",
        melody: "pepparkakas låten",
        author: "????",
        category: "IT"
    }
];

const ShowSongs = () => (
    <DigitLayout.Column centerHorizontal alignTop padding="10px">
        {songs.map(s => (
            <ShowSong {...s} />
        ))}
    </DigitLayout.Column>
);

export default ShowSongs;
