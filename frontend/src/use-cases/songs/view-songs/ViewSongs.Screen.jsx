import useAdmin from "../../../common/hooks/use-admin";
import {useHistory, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useSongTag} from "../Songs.context";
import {getSong} from "../../../api/songs/get.songs.api";
import {DigitLoading, useDigitCustomDialog, useDigitTranslations} from "@cthit/react-digit-components";
import SongDetails from "./views/elements/song-detail/SongDetail.view";
import {ScreenContainer} from "./Songs.styles";
import SearchBar from "./views/elements/search-bar/Searchbar.view";
import SongMasonry from "./views/SongMasonry.view";
import FourZeroFour from "../../../common/elements/FourZeroZero";

const ViewSongs = () => {
    const history = useHistory();
    const [text] = useDigitTranslations();

    const [filterText, setFilterText] = useState("")
    const [filterTags, setFilterTags] = useState([])

    const {songs, tags, loadingSongs, loadSongs} = useSongTag()
    useEffect(() => {
        if (songs.length === 0) {
            loadSongs()
        }
    }, [])

    const {song_id} = useParams();
    const [openDialog] = useDigitCustomDialog();
    const [dialogData, setDialogData] = useState({s: {}, t: []})
    const [faultySongId, setFaultySongId] = useState(false);
    useEffect(() => {
        if (song_id) {
            getSong(song_id)
                .then(res => {
                    let song = res.data.data.song;
                    let tags = Object.values(res.data.data.tags);
                    setDialogData({s: song, t: tags})
                })
                .catch(err => {
                    setFaultySongId(true);
                });
        }
    }, [song_id]);

    const admin = useAdmin();
    useEffect(() => {
        if (dialogData.s.title) {
            openDialog(SongDetails(admin, dialogData.s, dialogData.t, history, text))
        }
    }, [admin, dialogData, text])


    if (faultySongId) {
        return <FourZeroFour/>
    }

    return (
        <ScreenContainer>
            <SearchBar
                filterTextState={{filterText, setFilterText}}
                filterTagsState={{filterTags, setFilterTags}}/>
            <DigitLoading margin={{left: "auto", right: "auto", top: "32px"}} loading={loadingSongs}/>

            {!loadingSongs &&
            <SongMasonry
                filterText={filterText}
                filterTags={filterTags}
                songs={songs}
                tags={tags}/>}
        </ScreenContainer>
    );
}

export default ViewSongs;
