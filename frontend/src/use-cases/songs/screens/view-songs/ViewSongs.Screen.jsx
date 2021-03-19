import useAdmin from "../../../../common/hooks/use-admin";
import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSongTag } from "../../Songs.context";
import { getSong } from "../../../../api/songs/get.songs.api";
import {
    DigitLoading,
    useDigitCustomDialog,
    useDigitTranslations,
    DigitLayout
} from "@cthit/react-digit-components";
import SongDetails from "./components/song-detail/SongDetail.component";
import SearchBar from "./components/search-bar/Searchbar.component";
import FourZeroFour from "../../../../common/components/four-zero-four";
import SongMasonry from "./components/song-masonry";

const ViewSongs = () => {
    const history = useHistory();
    const [text] = useDigitTranslations();

    const [filterText, setFilterText] = useState("");
    const [filterTags, setFilterTags] = useState([]);

    const { songs, tags, loadingSongs, loadSongs } = useSongTag();
    useEffect(() => {
        if (songs.length === 0) {
            loadSongs();
        }
    }, [songs.length]);

    const { song_id } = useParams();
    const [openDialog] = useDigitCustomDialog();
    const [dialogData, setDialogData] = useState({ s: {}, t: [] });
    const [faultySongId, setFaultySongId] = useState(false);
    useEffect(() => {
        if (song_id) {
            getSong(song_id)
                .then(res => {
                    let song = res.data.data.song;
                    let tags = Object.values(res.data.data.tags);
                    setDialogData({ s: song, t: tags });
                })
                .catch(err => {
                    setFaultySongId(true);
                });
        } else {
            setFaultySongId(false);
        }
    }, [song_id]);

    const admin = useAdmin();
    useEffect(() => {
        if (dialogData.s.title) {
            openDialog(
                SongDetails(admin, dialogData.s, dialogData.t, history, text)
            );
        }
    }, [admin, dialogData, text]);

    const [filteredSongs, setFilteredSongs] = useState(songs);
    useEffect(() => {
        const filterWorker = new Worker("/workers/filter.worker.js");
        filterWorker.onmessage = e => {
            setFilteredSongs(e.data);
        };
        filterWorker.postMessage({ songs, filterText, filterTags });
        return () => filterWorker.terminate();
    }, [filterTags, filterText, songs]);

    if (faultySongId) {
        return <FourZeroFour />;
    }

    return (
        <DigitLayout.Column flex={"1"}>
            <SearchBar
                filterTextState={{ filterText, setFilterText }}
                filterTagsState={{ filterTags, setFilterTags }}
            />
            <DigitLoading
                margin={{ left: "auto", right: "auto", top: "32px" }}
                loading={loadingSongs}
            />
            <SongMasonry songs={filteredSongs} tags={tags} />
        </DigitLayout.Column>
    );
};

export default ViewSongs;
