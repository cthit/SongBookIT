import { useHistory } from "react-router-dom";
import { useStateValue } from "../../Songs.context";
import React, { useEffect, useMemo, useState } from "react";
import { SongCard, SongCardBody, SongGrid, TagList } from "../Songs.styles";
import {
    DigitChip,
    DigitMarkdown,
    DigitText,
    useDigitTranslations
} from "@cthit/react-digit-components";
import { findTags } from "../../../../common/hooks/tags";
import { navViewSong } from "../../../../app/App.Routes";

const filterTagsFunc = tags => {
    return song => song.tags.some(tag => tags.includes(tag));
};

const filterSearchFunc = search => {
    return song =>
        (song.title + song.number).toLowerCase().includes(search.toLowerCase());
};

const applyFilters = (songsToCheck, filters) => {
    if (filters.length) {
        return songsToCheck.filter(song => {
            return filters.map(func => func(song)).every(x => x);
        });
    } else {
        return songsToCheck;
    }
};

export const GridOfSongs = ({ songs, tags }) => {
    const [text] = useDigitTranslations();
    let history = useHistory();
    const [{ filterSearch, filterTags }] = useStateValue();
    const [filteredSongs, setFilteredSongs] = useState(songs);

    const filterFuncArr = [];

    useEffect(() => {
        filterFuncArr.splice(0);
        if (filterTags.length) {
            filterFuncArr.push(filterTagsFunc(filterTags));
        }
        if (filterSearch !== "") {
            filterFuncArr.push(filterSearchFunc(filterSearch));
        }
        setFilteredSongs(applyFilters(songs, filterFuncArr));
    }, [filterSearch, filterTags]);

    return useMemo(
        () => (
            <SongGrid>
                {filteredSongs.map(s => (
                    <SongCard
                        key={s.song_id}
                        style={{ cursor: "pointer" }}
                        onClick={() => navViewSong(history, s.song_id)}
                    >
                        <SongCardBody>
                            <DigitText.Title text={s.number + ". " + s.title} />
                            <DigitText.Text
                                bold
                                text={text.Author + ": " + s.author}
                            />
                            <DigitText.Text text={"Mel: " + s.melody} />
                            <DigitMarkdown
                                markdownSource={s.text.slice(0, 100) + "..."}
                            />
                            <TagList>
                                {findTags(s.tags, tags).map(tag => (
                                    <DigitChip
                                        primary
                                        key={tag.tag_id}
                                        label={tag.name}
                                    />
                                ))}
                            </TagList>
                        </SongCardBody>
                    </SongCard>
                ))}
            </SongGrid>
        ),
        [JSON.stringify(filteredSongs), text]
    );
};

export default GridOfSongs;
