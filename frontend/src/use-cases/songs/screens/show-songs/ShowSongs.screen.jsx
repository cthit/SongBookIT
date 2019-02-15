import React from "react";
import { DigitLayout } from "@cthit/react-digit-components";
import ShowSong from "../views/show-song";
import { getSongs } from "../../../../api/songs/get.songs.api";

class ShowSongs extends React.Component {
    constructor(props) {
        super(props);
        this.state = { songs: [] };
        this.getAllSongs();
    }

    getAllSongs = () => {
        getSongs()
            .then(res => {
                const songData = Object.values(res.data.Song);
                this.setState({ songs: songData });
            })
            .catch(err => {
                console.log("Error when loading songs", err);
            });
    };

    render() {
        return (
            <DigitLayout.Column centerHorizontal alignTop padding="10px">
                {this.state.songs.map(s => (
                    <ShowSong {...s} />
                ))}
            </DigitLayout.Column>
        );
    }
}

export default ShowSongs;
