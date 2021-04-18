import React, { useEffect, useState } from "react";
import {
    useDigitTranslations,
    useGammaMe
} from "@cthit/react-digit-components";
import Masonry from "../../../../../../common/components/masonry";
import SongPreview from "../../../../../../common/components/song-preview";
import NoSongs from "../no-songs";
import { useSongs } from "../../../../../../app/Songs.context";
import CenterLoading from "../../../../../../common/components/center-loading";
import * as fuzzysort from "fuzzysort";

export const SongMasonry = ({ resetFilters, filterText, filterTags }) => {
    const [text, lang] = useDigitTranslations();
    const user = useGammaMe();

    const { songs, tags, loading } = useSongs();

    // FILTERING
    const [filteredSongs, setFilteredSongs] = useState(songs);
    useEffect(() => {
        let f = songs;

        if (filterTags.length) {
            f = f.filter(song =>
                song.tags.some(tag => filterTags.includes(tag))
            );
        }

        // if the search string given to fuzzy is empty it give no results
        if (filterText !== "") {
            // fuzzy assumes all fields are string so number has to be converted
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
    }, [filterTags, filterText, songs]);

    return (
        <>
            <CenterLoading loading={loading} />
            {!loading && (
                <>
                    {filteredSongs.length === 0 && (
                        <NoSongs resetFilters={resetFilters} />
                    )}
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
                </>
            )}
        </>
    );
};
