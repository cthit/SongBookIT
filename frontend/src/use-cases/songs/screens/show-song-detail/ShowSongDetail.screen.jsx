import React from "react";
import {
    DigitLayout,
    DigitIfElseRendering
} from "@cthit/react-digit-components";
import ShowSong from "../common-views/show-song";
import { getSong } from "../../../../api/songs/get.songs.api";

class ShowSongDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { song: null };
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
            <DigitIfElseRendering
                test={this.state.song != null}
                ifRender={() => (
                    <DigitLayout.Column
                        centerHorizontal
                        alignTop
                        padding="10px"
                    >
                        <ShowSong {...this.state.song} />
                    </DigitLayout.Column>
                )}
            />
        );
    }
}

export default ShowSongDetail;
