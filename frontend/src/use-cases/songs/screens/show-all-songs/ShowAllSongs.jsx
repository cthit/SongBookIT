import React, { useState } from "react";
import ShowSong from "../common-views/show-song";
import { DigitLayout, DigitFAB } from "@cthit/react-digit-components";
import Add from "@material-ui/icons/Add";
import DialogViewSong from "../common-views/dialogs/dialog-view-song";
import DialogAddSong from "../common-views/dialogs/dialog-add-song";

const openSong = (id, setOpen, loadCurrentSong) => {
    setOpen(true);
    loadCurrentSong(id);
};

const ShowAllSongs = ({ songs, loadCurrentSong, currentSong }) => {
    const [open, setOpen] = useState(false);

    return (
        <DigitLayout.Fill>
            <DigitLayout.DownRightPosition style={{ position: "fixed" }}>
                <DigitFAB icon={Add} secondary onClick={() => setOpen(true)} />
                <DialogViewSong
                    open={currentSong != null}
                    handleClose={() => setOpen(false)}
                    song={currentSong}
                />
                <DialogAddSong open={open} handleClose={() => setOpen(false)} />
            </DigitLayout.DownRightPosition>
            <DigitLayout.UniformGrid minItemWidth="350px">
                {songs.map(s => (
                    <div>
                        <ShowSong
                            {...s}
                            key={s.song_id}
                            onClick={
                                e =>
                                    console.log(
                                        e
                                    ) /*loadCurrentSong(e.currentTarget.dataset.id)*/
                            }
                        />
                        <button
                            value={s.song_id}
                            id={s.song_id}
                            key={s.song_id + "hej"}
                            onClick={e => loadCurrentSong(e.currentTarget.id)}
                        />
                    </div>
                ))}
            </DigitLayout.UniformGrid>
        </DigitLayout.Fill>
    );
};

export default ShowAllSongs;
