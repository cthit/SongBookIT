import React, { useState } from "react";
import ShowSong from "../common-views/show-song";
import { DigitLayout, DigitFAB } from "@cthit/react-digit-components";
import Add from "@material-ui/icons/Add";
import DialogViewSong from "../common-views/dialogs/dialog-view-song";
import DialogAddSong from "../common-views/dialogs/dialog-add-song";

const ShowAllSongs = ({ loadSongs, songs, loadCurrentSong, currentSong }) => {
    if (!songs) loadSongs();

    const [openView, setOpenView] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);

    console.log("currentSong: ------------------------------------");
    console.log(currentSong);

    const openSong = s => {
        console.log(s);
        loadCurrentSong(s.song_id);
        setOpenView(true);
    };
    return (
        <DigitLayout.Fill>
            <DigitLayout.DownRightPosition style={{ position: "fixed" }}>
                <DigitFAB
                    icon={Add}
                    secondary
                    onClick={() => setOpenCreate(true)}
                />
                <DialogViewSong
                    open={currentSong && openView}
                    handleClose={() => setOpenView(false)}
                    song={currentSong}
                />
                <DialogAddSong
                    open={openCreate}
                    handleClose={() => setOpenCreate(false)}
                />
            </DigitLayout.DownRightPosition>
            <DigitLayout.UniformGrid minItemWidth="350px">
                {(songs || []).map(s => (
                    <ShowSong
                        {...s}
                        key={s.song_id}
                        openSong={() => openSong(s)}
                    />
                ))}
            </DigitLayout.UniformGrid>
        </DigitLayout.Fill>
    );
};

export default ShowAllSongs;
