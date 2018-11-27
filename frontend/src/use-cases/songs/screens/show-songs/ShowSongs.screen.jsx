import React from "react";
import { DigitLayout } from "@cthit/react-digit-components";

const songs = [
    {
        name: "namn på låten",
        lyrics: "text som sjungs",
        melody: "melodi för låten",
        author: "vem som skrev låten",
        category: "med vilka låter denna klumpas"
    },
    {
        name: "namn på låten",
        lyrics: "text som sjungs",
        melody: "melodi för låten",
        author: "vem som skrev låten",
        category: "med vilka låter denna klumpas"
    }
];

const ShowSongs = () => (
    <DigitLayout.Column centerHorizontal alignTop padding="10px">
        <div>skdflsdmfk</div>
        <div>skdflsdmfk</div>
        <div>skdflsdmfk</div>
        <div>skdflsdmfk</div>
        <div>skdflsdmfk</div>
    </DigitLayout.Column>
);

export default ShowSongs;
