import useAdmin from "../../../../common/hooks/use-admin";
import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

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
import FiveZeroZeroComponent from "../../../../common/components/five-zero-zero";
import { useSongs } from "../../Songs.context";

const ViewSongs = () => {
    const history = useHistory();
    const [text] = useDigitTranslations();

    const [filterText, setFilterText] = useState("");
    const [filterTags, setFilterTags] = useState([]);

    const { songs, tags, getSong, loading, error } = useSongs();

    const { song_id } = useParams();
    const [openDialog] = useDigitCustomDialog();
    const [faultySongId, setFaultySongId] = useState(false);
    const [somethingWrong, setSomethingWrong] = useState(false);
    const admin = useAdmin();

    useEffect(() => {
        if (!loading) {
            if (song_id) {
                const song = getSong(song_id);
                if (song) {
                    openDialog(SongDetails(admin, song, history, text));
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
    }, [loading, song_id, text]);

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

    if (somethingWrong) {
        return <FiveZeroZeroComponent />;
    }

    return (
        <DigitLayout.Column flex={"1"}>
            <SearchBar
                filterTextState={{ filterText, setFilterText }}
                filterTagsState={{ filterTags, setFilterTags }}
            />
            <DigitLoading
                margin={{ left: "auto", right: "auto", top: "32px" }}
                loading={loading}
            />
            <SongMasonry songs={filteredSongs} tags={tags} />
        </DigitLayout.Column>
    );
};

export default ViewSongs;
