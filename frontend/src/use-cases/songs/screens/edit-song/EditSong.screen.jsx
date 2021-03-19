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

const EditSong = () => {
    let { song_id } = useParams();
    const [faultySongId, setFaultySongId] = useState(false);
    const [hasLoadedSong, setHasLoadedSong] = useState(false);
    const [songToEdit, setSongToEdit] = useState({
        song_id: "",
        title: "",
        melody: "",
        text: "",
        author: "",
        tags: []
    });

    useEffect(() => {
        getSong(song_id)
            .then(res => {
                setSongToEdit(res.data.data.song);
                setHasLoadedSong(true);
            })
            .catch(err => {
                setFaultySongId(true);
                setHasLoadedSong(false);
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

    return (
        <>
            <DigitLoading
                loading={!hasLoadedSong}
                margin={{ left: "auto", right: "auto", top: "32px" }}
            />
            {hasLoadedSong && (
                <SongFormContainer>
                    <div />
                    <EditSongForm song={songToEdit} />
                    <FormatSongInstructions />
                </SongFormContainer>
            )}
        </>
    );
};

export default EditSong;
