import React from "react";
import { DigitLayout } from "@cthit/react-digit-components";
import ShowSong from "../views/show-song";

class ShowSongs extends React.Component {
    constructor(props) {
        super(props);
        this.state = { songs: [] };
        this.getAllSongs();
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
