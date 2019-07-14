import React, { useState } from "react";
import ShowSong from "../common-views/show-song";
import { DigitLayout, DigitFAB } from "@cthit/react-digit-components";
import Add from "@material-ui/icons/Add";
import DialogViewSong from "../common-views/dialogs/dialog-view-song";
import DialogAddSong from "../common-views/dialogs/dialog-add-song";

const ShowAllSongs = ({ songs, loadCurrentSong, currentSong }) => {
    const [openView, setOpenView] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);

    const text = songs.every(s => "text" in s);

    console.log(text);

    const openSong = s => {
        setOpenView(true);
        loadCurrentSong(s.id);
        console.log(s);
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
                    open={openView}
                    handleClose={() => setOpenView(false)}
                    song={currentSong}
                />
                <DialogAddSong
                    open={openCreate}
                    handleClose={() => setOpenCreate(false)}
                />
            </DigitLayout.DownRightPosition>
            <DigitLayout.UniformGrid minItemWidth="350px">
                {songs.map(s => (
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
