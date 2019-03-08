import React from "react";
import {
    DigitLayout,
    DigitIfElseRendering,
    DigitLoading,
    DigitFAB,
    DigitDesign
} from "@cthit/react-digit-components";
import ShowSong from "../common-views/show-song";
import { getSong } from "../../../../api/songs/get.songs.api";

class ShowSongDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { song: null, open: false };
        const songId = this.props.match.params.id;
        this.getAndSetSong(songId);
    }

    getAndSetSong = id => {
        getSong(id)
            .then(res => {
                const s = res.data.Song[id];
                this.setState({ song: s });
            })
            .catch(err => {
                console.log("Error when loading song", err);
            });
    };

    render() {
        return (
            <DigitLayout.Column centerHorizontal alignTop padding="10px">
                <DigitIfElseRendering
                    test={this.state.song != null}
                    ifRender={() => <ShowSong {...this.state.song} />}
                    elseRender={() => <DigitLoading loading />}
                />
            </DigitLayout.Column>
        );
    }
}

export default ShowSongDetail;
