import React, { useEffect, useState } from "react";
import { DigitLoading, useGammaStatus } from "@cthit/react-digit-components";
import { useParams } from "react-router-dom";
import { getSong } from "../../../../api/songs/get.songs.api";
import useAdmin from "../../../../common/hooks/use-admin";
import InsufficientAccess from "../../../../common/components/insufficient-access";
import EditSongForm from "./components/edit-song-form";
import FourZeroFour from "../../../../common/components/four-zero-four";
import SongFormContainer from "../../components/song-form-container";
import FormatSongInstructions from "../../components/format-song-instruction";
import FiveZeroZeroComponent from "../../../../common/components/five-zero-zero";

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

    const admin = useAdmin();
    const [loading] = useGammaStatus();
    if (!loading && !admin) {
        return <InsufficientAccess />;
    }

    if (faultySongId) {
        return <FourZeroFour />;
    }

    if (somethingWrong) {
        return <FiveZeroZeroComponent />;
    }

    return (
        <>
            <DigitLoading
                loading={songToEdit === null}
                margin={{ left: "auto", right: "auto", top: "32px" }}
            />
            {songToEdit !== null && (
                <SongFormContainer>
                    <div />
                    <EditSongForm
                        song={songToEdit}
                        setSomethingWrong={setSomethingWrong}
                    />
                    <FormatSongInstructions />
                </SongFormContainer>
            )}
        </>
    );
};

export default EditSong;
