import React from "react";
import {
    DigitLayout,
    DigitFAB,
    DigitDesign
} from "@cthit/react-digit-components";
import ShowSong from "../common-views/show-song";
import { getSongs } from "../../../../api/songs/get.songs.api";
import Add from "@material-ui/icons/Add";
import Dialog from "../common-views/dialog-view/";

class ShowAllSongs extends React.Component {
    constructor(props) {
        super(props);
        this.state = { songs: [], open: false };
        this.getAllSongs();
    }

    getAllSongs = () => {
        getSongs()
            .then(res => {
                const songData = Object.values(res.data.Song);
                this.setState({ songs: songData });
            })
            .catch(err => {
                console.log("Error when loading all songs", err);
            });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <DigitLayout.Fill>
                <DigitLayout.Column centerHorizontal alignTop padding="10px">
                    {this.state.songs.map(s => (
                        <ShowSong {...s} key={s.song_id} />
                    ))}
                </DigitLayout.Column>
                <DigitLayout.DownRightPosition style={{ position: "fixed" }}>
                    <DigitFAB
                        icon={Add}
                        secondary
                        onClick={this.handleClickOpen}
                    />
                    <Dialog
                        open={this.state.open}
                        handleClose={this.handleClose}
                    />
                </DigitLayout.DownRightPosition>
            </DigitLayout.Fill>
        );
    }
}

export default ShowAllSongs;
