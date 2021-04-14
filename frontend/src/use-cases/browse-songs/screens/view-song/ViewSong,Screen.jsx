import React, { useEffect, useState } from "react";
import { DigitLayout } from "@cthit/react-digit-components";
import { useSongs } from "../../../../app/Songs.context";
import { useParams } from "react-router-dom";
import FourZeroFour from "../../../../common/components/four-zero-four";
import FiveZeroZero from "../../../../common/components/five-zero-zero";
import CenterLoading from "../../../../common/components/center-loading";
import SongDetailCard from "./components/song-detail-card";

export const ViewSong = () => {
    const [song, setSong] = useState(null);

    const {
        getSongFromContext,
        loading,
        refetching,
        error,
        refetchSong
    } = useSongs();
    const { song_id } = useParams();
    const [faultySongId, setFaultySongId] = useState(false);
    const [somethingWrong, setSomethingWrong] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (song_id) {
                const song = getSongFromContext(song_id);
                if (song) {
                    setSong(song);
                } else {
                    if (error) {
                        setSomethingWrong(true);
                    } else {
                        setFaultySongId(true);
                    }
                }
            } else {
                setFaultySongId(false);
            }
        }
    }, [loading, song_id, getSongFromContext, error]);

    if (faultySongId) {
        return <FourZeroFour />;
    }

    if (somethingWrong) {
        return <FiveZeroZero />;
    }

    return (
        <DigitLayout.Column centerHorizontal>
            <CenterLoading loading={refetching || loading} />
            {song !== null && (
                <SongDetailCard song={song} refetchSong={refetchSong} />
            )}
        </DigitLayout.Column>
    );
};
