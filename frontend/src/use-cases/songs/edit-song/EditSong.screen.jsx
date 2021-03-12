import React, {useEffect, useState} from "react";
import {DigitLayout, DigitLoading, useGammaStatus} from "@cthit/react-digit-components";
import {useParams} from "react-router-dom";
import {getSong} from "../../../api/songs/get.songs.api";
import useAdmin from "../../../common/hooks/use-admin";
import InsufficientAccess from "../../../common/elements/InsufficientAccess";
import EditSongForm from "./views/EditSongForm.view";
import FourZeroFour from "../../../common/elements/FourZeroZero";

const EditSong = () => {
    let {song_id} = useParams();
    const [faultySongId, setFaultySongId] = useState(false)
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
    const [loading,] = useGammaStatus()
    ;
    if (!loading && !admin) {
        return <InsufficientAccess/>;
    }

    if (faultySongId) {
        return <FourZeroFour/>
    }

    return (
        <>
            <DigitLoading loading={!hasLoadedSong} margin={{left: "auto", right: "auto", top: "32px"}}/>
            {hasLoadedSong && (
                <DigitLayout.Column centerHorizontal flex={1}>
                    <EditSongForm song={songToEdit}/>
                </DigitLayout.Column>)
            }
        </>

    )
}


export default EditSong;
