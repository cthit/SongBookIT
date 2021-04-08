import React, { useEffect, useState } from "react";
import { DigitLayout } from "@cthit/react-digit-components";
import { useParams } from "react-router-dom";
import { getSong } from "../../../../api/songs/get.songs.api";
import EditSongForm from "./components/edit-song-form";
import FourZeroFour from "../../../../common/components/four-zero-four";
import CenterLoading from "../../../../common/components/center-loading";
import FiveZeroZero from "../../../../common/components/five-zero-zero";

const EditSong = () => {
    const { song_id } = useParams();
    const [faultySongId, setFaultySongId] = useState(false);
    const [songToEdit, setSongToEdit] = useState(null);
    const [somethingWrong, setSomethingWrong] = useState(false);

    useEffect(() => {
        getSong(song_id)
            .then(res => {
                setSongToEdit(res.data.data.song);
                setFaultySongId(false);
            })
            .catch(err => {
                setFaultySongId(true);
            });
    }, [song_id]);

    if (faultySongId) {
        return <FourZeroFour />;
    }

    if (somethingWrong) {
        return <FiveZeroZero />;
    }

    return (
        <>
            <CenterLoading loading={songToEdit === null} />
            {songToEdit !== null && (
                <DigitLayout.Column centerHorizontal>
                    <EditSongForm
                        song={songToEdit}
                        setSomethingWrong={setSomethingWrong}
                    />
                </DigitLayout.Column>
            )}
        </>
    );
};

export default EditSong;
