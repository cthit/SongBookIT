import {useHistory} from "react-router-dom";
import React, {useEffect, useMemo, useState} from "react";
import {SongCardBody, TagList} from "../Songs.styles";
import {
    DigitChip, DigitDesign,
    DigitMarkdown,
    DigitText,
    useDigitTranslations
} from "@cthit/react-digit-components";
import {findTags} from "../../../../common/logic/tags";
import {navViewSong} from "../../../../app/App.Routes";
import Masonry from "./elements/masonry/Masonry";
import {useFilterSongs} from "../../contexts/FilterSongs.context";

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

const startOfText = (text) => {
    const start = text.slice(0,100)
    const [restOfLine, ] = text.slice(100).split("\n", 1)
    return start.concat(restOfLine, "\n\n...")
}

export const SongMasonry = ({songs, tags}) => {
    const [text] = useDigitTranslations();
    let history = useHistory();
    const [{filterSearch, filterTags}] = useFilterSongs();
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
            <Masonry>
                {filteredSongs.map(s => {
                    const melody = s.melody ? s.melody : text.Unknown;
                    const author = s.author ? s.author : text.Unknown;

                    return (
                        <DigitDesign.Card
                            key={s.song_id}
                            style={{cursor: "pointer"}}
                            onClick={() => navViewSong(history, s.song_id)}
                        >
                            <SongCardBody>
                                <DigitText.Title text={s.number + ". " + s.title}/>
                                <DigitText.Text
                                    bold
                                    text={text.Author + ": " + author}
                                />
                                <DigitText.Text text={"Mel: " + melody}/>
                                <DigitMarkdown
                                    markdownSource={startOfText(s.text)}
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
                        </DigitDesign.Card>
                    )
                })}
            </Masonry>
        ),
        [JSON.stringify(filteredSongs), text]
    )
}


export default SongMasonry;