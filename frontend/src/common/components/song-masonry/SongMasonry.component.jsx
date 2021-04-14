import React, { useEffect, useRef, useState } from "react";
import {
    useDigitTranslations,
    useGammaMe
} from "@cthit/react-digit-components";
import Masonry from "./masonry";
import SongPreview from "./song-preview";
import NoSongs from "../../../use-cases/browse-songs/screens/all-songs/components/no-songs";
import { useSongs } from "../../../app/Songs.context";
import CenterLoading from "../center-loading";
import * as fuzzysort from "fuzzysort";

export const SongMasonry = ({ resetFilters, filterText, filterTags }) => {
    const [text, lang] = useDigitTranslations();
    const user = useGammaMe();

    const { songs, tags, loading, refetching } = useSongs();

    // FILTERING
    const [filteredSongs, setFilteredSongs] = useState(songs);
    const [isFiltering, setIsFiltering] = useState(false);
    useEffect(() => {
        setIsFiltering(true);
        let f = songs;

        if (filterTags.length) {
            f = f.filter(song =>
                song.tags.some(tag => filterTags.includes(tag))
            );
        }

        if (filterText !== "") {
            f = f.map(s => ({
                ...s,
                number: "" + s.number
            }));

            const res = fuzzysort.go(filterText, f, {
                keys: ["number", "title", "melody", "author", "text"],
                allowTypo: false,
                threshold: -500
            });

            f = res.map(r => r.obj);
        }
        setFilteredSongs(f);
        setIsFiltering(false);
    }, [filterTags, filterText, songs]);

    return (
        <>
            <CenterLoading loading={isFiltering || refetching || loading} />
            {!isFiltering && !refetching && filteredSongs.length === 0 && (
                <NoSongs resetFilters={resetFilters} />
            )}
            {!loading && !isFiltering && (
                <Masonry>
                    {filteredSongs.map(s => (
                        <SongPreview
                            key={s.song_id}
                            song={s}
                            text={text}
                            lang={lang}
                            tags={tags}
                            user={user}
                        />
                    ))}
                </Masonry>
            )}
        </>
    );
};
