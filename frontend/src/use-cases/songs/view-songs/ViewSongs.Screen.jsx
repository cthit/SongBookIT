import useAdmin from "../../../common/hooks/use-admin";
import {useHistory, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import { useSongTag} from "../contexts/Songs.context";
import {getSong} from "../../../api/songs/get.songs.api";
import {
    DigitLayout, DigitLoading,
    useDigitCustomDialog,
    useDigitTranslations
} from "@cthit/react-digit-components";
import SongDetails from "./views/elements/song-detail/SongDetail.view";
import {ScreenContainer} from "./Songs.styles";
import SearchBar from "./views/elements/search-bar/Searchbar.view";
import {ErrorTextCard} from "../../../common/elements/Error";
import SongMasonry from "./views/SongMasonry.view";

const ViewSongs = () => {
    const admin = useAdmin();
    const history = useHistory();
    const [error, setError] = useState({isError: false, message: ""});
    const {songs, tags, loading, loadSongs} = useSongTag()
    useEffect(() => loadSongs(),[])

    const [openDialog] = useDigitCustomDialog();
    const {song_id} = useParams();
    const [text] = useDigitTranslations();
    const [dialogData, setDialogData] = useState({s: {}, t: []})

    useEffect(() => {
        if (song_id) {
            getSong(song_id)
                .then(res => {
                    let song = res.data.data.song;
                    let tags = Object.values(res.data.data.tags);
                    setDialogData({s: song, t: tags})
                    setError({isError: false, message: ""})
                })
                .catch(err => {
                    setError(err.response.data.error);
                });
        }
    }, [song_id]);

    useEffect(() => {
        if (dialogData.s.title) {
            openDialog(SongDetails(admin, dialogData.s, dialogData.t, history, text))
        }
    }, [admin, dialogData, text])

    return (
        <ScreenContainer>
            <SearchBar/>
            {loading && <DigitLoading margin={{ left: "auto", right: "auto", top: "32px" }} loading/>}
            {error.isError && (
                <DigitLayout.Column centerHorizontal flex={1}>
                    <ErrorTextCard message={error.message}/>
                </DigitLayout.Column>
            )}
            {!loading && <SongMasonry songs={songs} tags={tags}/>}
        </ScreenContainer>
    );
};

export default ViewSongs;
