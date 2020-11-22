import React, { useState, useMemo, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
    DigitLayout,
    DigitFAB,
    DigitDesign,
    DigitText,
    DigitMarkdown,
    DigitLoading,
    useDigitCustomDialog,
    DigitChip,
} from "@cthit/react-digit-components";
import Add from "@material-ui/icons/Add";
import SongDetails from "./views/ViewSongDetail.view";
import SearchBar from "./views/Searchbar.view";
import { useStateValue, StateActions } from "../../app/App.context";
import {findTags} from "../../common/Tags";
import { getSong, getSongs } from "../../api/songs/get.songs.api";
import { ScreenContainer, SongCard, SongCardBody, SongGrid, TagList } from "./Songs.styles";
import { CentralLoading } from "../../common-ui/CentralLoading";
import { ErrorTextCard } from "../../common-ui/Error";
import { CenterContainer } from "../../common-ui/Common.styles";

const filterTagsFunc = tags => {
    return song => song.tags.some(tag => tags.includes(tag))
}

const filterSearchFunc = search => {
    return song => (song.title + song.number)
        .toLowerCase()
        .includes(search.toLowerCase())
}

const applyFilters = (songsToCheck, filters) => {
    if (filters.length) {
        return songsToCheck.filter(song => {
            return filters.map(func => func(song)).every(x => x)
        })
    } else {
        return songsToCheck
    }
}

const GridOfSongs = ({ songs, tags }) => {
    let history = useHistory();
    const [{ filterSearch, filterTags }] = useStateValue();
    const [filteredSongs, setFilteredSongs] = useState(songs);

    const filterFuncArr = []

    useEffect(() => {
        filterFuncArr.splice(0)
        if (filterTags.length) {
            filterFuncArr.push(filterTagsFunc(filterTags))
        }
        if(filterSearch !== "") {
            filterFuncArr.push(filterSearchFunc(filterSearch))
        }
        setFilteredSongs(applyFilters(songs, filterFuncArr))
    }, [filterSearch, filterTags]);

    return useMemo(
        () => (
            <SongGrid>
                {filteredSongs.map(s => (
                    <SongCard
                        key={s.song_id}
                        style={{    cursor: "pointer" }}
                        onClick={() => history.push('/songs/' + s.song_id)}
                    >
                        <SongCardBody>
                            <DigitText.Title text={s.number + ". " + s.title} />
                            <DigitText.Text
                                bold
                                text={"Författare: " + s.author}
                            />
                            <DigitText.Text text={"Mel: " + s.melody} />
                            <DigitMarkdown
                                markdownSource={
                                    s.text.slice(0, 100) + "..."
                                }
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
        [JSON.stringify(filteredSongs)]
    );
};

const Songs = () => {
    let history = useHistory();
    const [error, setError] = useState({isError: false, message: ""})
    const [{ songs, tags}, dispatch] = useStateValue();
    useEffect(() => {
        if (songs.length === 0) {
            getSongs().then(res => {
                dispatch({
                    type: StateActions.getSongs,
                    songs: Object.values(res.data.data.songs).sort((a, b) => (a.number > b.number ? 1 : -1)),
                    tags: Object.values(res.data.data.tags).sort((a, b) => (a.name > b.name ? 1 : -1)),
                });
            });
        }
    }, []);

    const [openDialog] = useDigitCustomDialog();
    let { song_id } = useParams();
    const validSongId = song_id !== undefined && song_id.length === 4
    useEffect( () => {
        if (validSongId) {
            getSong(song_id).then(res => {
                let s = res.data.data.song
                let t = Object.values(res.data.data.tags)
                openDialog(SongDetails(s, t, history))
            }).catch((err) => {
                    setError(err.response.data.error)
            })
        }
    }, [song_id])

    return (
        <>
            <ScreenContainer>
                <SearchBar />
                {songs.length === 0 &&
                    <CentralLoading/>}
                {error.isError &&
                    <CenterContainer>
                        <ErrorTextCard message={error.message} />
                    </CenterContainer>}
                {songs.length !== 0 &&
                    <GridOfSongs songs={songs} tags={tags} />}
            </ScreenContainer>

            <DigitLayout.DownRightPosition>
                <DigitFAB
                    icon={Add}
                    secondary
                    onClick={() => history.push("/songs/create")}
                />
            </DigitLayout.DownRightPosition>
        </>
    );
};

export default Songs;
