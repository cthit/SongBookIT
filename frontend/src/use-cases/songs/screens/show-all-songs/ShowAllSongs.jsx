import React from "react";
import { DigitLayout } from "@cthit/react-digit-components";
import ShowSong from "../common-views/show-song";
import { getSongs } from "../../../../api/songs/get.songs.api";

const ShowAllSongs = ({ songs }) => (
    <DigitLayout.Column centerHorizontal alignTop padding="10px">
        {songs.map(s => (
            <ShowSong {...s} key={s.song_id} />
        ))}
    </DigitLayout.Column>
);

export default ShowAllSongs;
