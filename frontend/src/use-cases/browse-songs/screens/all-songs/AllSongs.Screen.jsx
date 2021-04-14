import useAdmin from "../../../../common/hooks/use-admin";
import { useHistory, useParams } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import {
    DigitLayout,
    useDigitCustomDialog,
    useDigitTranslations,
    useGammaMe
} from "@cthit/react-digit-components";
import SongDetails from "./components/song-detail/SongDetail.dialog";
import SearchBar from "./components/search-bar/Searchbar.component";
import SongMasonry from "../../../../common/components/song-masonry";
import { useSongs } from "../../../../app/Songs.context";
import FourZeroFour from "../../../../common/components/four-zero-four";
import FiveZeroZero from "../../../../common/components/five-zero-zero";
import useDebounce from "../../../../common/hooks/use-debounce";

export const AllSongs = () => {
    const history = useHistory();
    const [text, lang] = useDigitTranslations();
    const user = useGammaMe();

    const [filterText, setFilterText] = useState("");
    const [filterTags, setFilterTags] = useState([]);
    const resetFilters = () => {
        setFilterTags([]);
        setFilterText("");
    };

    const deBouncedFilterText = useDebounce(filterText, 400);

    const {
        songs,
        getSongFromContext,
        loading,
        error,
        refetchSong
    } = useSongs();
    const { song_id } = useParams();
    const [openDialog] = useDigitCustomDialog();
    const [faultySongId, setFaultySongId] = useState(false);
    const [somethingWrong, setSomethingWrong] = useState(false);
    const admin = useAdmin();

    useEffect(() => {
        if (!loading) {
            if (song_id) {
                const song = getSongFromContext(song_id);
                if (song) {
                    openDialog(
                        SongDetails(
                            admin,
                            song,
                            history,
                            text,
                            lang,
                            user,
                            refetchSong
                        )
                    );
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
    }, [
        lang,
        refetchSong,
        user,
        loading,
        song_id,
        text,
        admin,
        getSongFromContext,
        openDialog,
        history,
        error,
        songs
    ]);

    if (faultySongId) {
        return <FourZeroFour />;
    }

    if (somethingWrong) {
        return <FiveZeroZero />;
    }

    return (
        <DigitLayout.Column>
            <SearchBar
                filterTextState={{ filterText, setFilterText }}
                filterTagsState={{ filterTags, setFilterTags }}
            />
            <SongMasonry
                resetFilters={resetFilters}
                filterTags={filterTags}
                filterText={deBouncedFilterText}
            />
        </DigitLayout.Column>
    );
};
