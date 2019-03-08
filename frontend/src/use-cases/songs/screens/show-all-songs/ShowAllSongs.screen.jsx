import React from "react";
import { DigitLayout, DigitFAB } from "@cthit/react-digit-components";
import ShowSong from "../common-views/show-song";
import Add from "@material-ui/icons/Add";
import Dialog from "../common-views/dialog-view/";

class ShowAllSongs extends React.Component {
    constructor(props) {
        super(props);
        console.log("props");
    }

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
                    {this.props.songs.map(s => (
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
