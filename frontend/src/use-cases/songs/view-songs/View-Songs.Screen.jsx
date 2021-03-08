import useAdmin from "../../../common/hooks/use-admin";
import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { SongTagActions, useStateValue } from "../Songs.context";
import { getSong, getSongs } from "../../../api/songs/get.songs.api";
import { useDigitCustomDialog } from "@cthit/react-digit-components";
import SongDetails from "./views/ViewSongDetail.view";
import { ScreenContainer } from "./Songs.styles";
import SearchBar from "./views/Searchbar.view";
import { CentralLoading } from "../../../common-ui/layout/CentralLoading";
import { CenterContainer } from "../../../common-ui/design/Common.styles";
import { ErrorTextCard } from "../../../common/elements/Error";
import GridOfSongs from "./views/GridOfSongs.view";

const ViewSongs = () => {
    const admin = useAdmin();
    let history = useHistory();
    const [error, setError] = useState({ isError: false, message: "" });
    const [{ songs, tags }, dispatch] = useStateValue();
    useEffect(() => {
        if (songs.length === 0) {
            getSongs().then(res => {
                dispatch({
                    type: SongTagActions.getSongs,
                    songs: Object.values(res.data.data.songs).sort((a, b) =>
                        a.number > b.number ? 1 : -1
                    ),
                    tags: Object.values(res.data.data.tags).sort((a, b) =>
                        a.name > b.name ? 1 : -1
                    )
                });
            });
        }
    }, []);

    const [openDialog] = useDigitCustomDialog();
    let { song_id } = useParams();
    const validSongId = song_id !== undefined && song_id.length === 4;
    useEffect(() => {
        if (validSongId) {
            getSong(song_id)
                .then(res => {
                    let s = res.data.data.song;
                    let t = Object.values(res.data.data.tags);
                    openDialog(SongDetails(admin, s, t, history));
                })
                .catch(err => {
                    console.log("what", err);
                    setError(err.response.data.error);
                });
        }
    }, [song_id]);

    return (
        <ScreenContainer>
            <SearchBar />
            {songs.length === 0 && <CentralLoading />}
            {error.isError && (
                <CenterContainer>
                    <ErrorTextCard message={error.message} />
                </CenterContainer>
            )}
            {songs.length !== 0 && <GridOfSongs songs={songs} tags={tags} />}
        </ScreenContainer>
    );
};

export default ViewSongs;
