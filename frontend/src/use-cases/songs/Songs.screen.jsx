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
import {findTags} from "./common/Tags";
import { getSong, getSongs } from "../../api/songs/get.songs.api";

const filterTagsFunc = tags => {
    return song => song.tags.some(tag => tags.includes(tag))
}

const filterSongFunc = search => {
    return song => song.title
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
            filterFuncArr.push(filterSongFunc(filterSearch))
        }
        setFilteredSongs(applyFilters(songs, filterFuncArr))
    }, [filterSearch, filterTags]);

    return useMemo(
        () => (
            <DigitLayout.UniformGrid
                margin="20px"
                minItemWidth="350px"
                justifyItems="center"
            >
                {filteredSongs.map(s => (
                    <DigitDesign.Card
                        key={s.song_id}
                        absWidth="350px"
                        onClick={() => history.push('/' + s.song_id)}
                    >
                        <DigitDesign.CardBody style={{ cursor: "pointer" }}>
                            <>
                                <DigitText.Title text={s.title} />
                                <DigitText.Text
                                    bold
                                    text={"Författare: " + s.author}
                                />
                                <DigitText.Text text={"Mel: " + s.melody} />
                                <DigitMarkdown
                                    markdownSource={
                                        s.text.slice(0, 150) + "..."
                                    }
                                />
                                <DigitLayout.Row>
                                    {findTags(s.tags, tags).map(tag => (
                                        <DigitChip
                                            primary
                                            key={tag.tag_id}
                                            label={tag.name}
                                        />
                                    ))}
                                </DigitLayout.Row>
                            </>
                        </DigitDesign.CardBody>
                    </DigitDesign.Card>
                ))}
            </DigitLayout.UniformGrid>
        ),
        [JSON.stringify(filteredSongs)]
    );
};

const Songs = () => {
    const [{ songs, tags}, dispatch] = useStateValue();
    let history = useHistory();


    useEffect(() => {
        if (songs.length === 0) {
            getSongs().then(res => {
                dispatch({
                    type: StateActions.getSongs,
                    songs: Object.values(res.data.data.songs),
                    tags: Object.values(res.data.data.tags),
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

            })
        }
    }, [song_id])






    return (
        <>
            <DigitLayout.Column >
                <SearchBar />
                {songs.length === 0 && <DigitLoading/>}
                {songs.length !== 0 && <GridOfSongs songs={songs} tags={tags} />}
            </DigitLayout.Column>

            <DigitLayout.DownRightPosition>
                <DigitFAB
                    icon={Add}
                    secondary
                    onClick={() => history.push("/create")}
                />
            </DigitLayout.DownRightPosition>
        </>
    );
};


const NoSongs = () => (
    <DigitLayout.Column centerHorizontal>
        <DigitLoading loading size={80} />
    </DigitLayout.Column>
);
const NoMatchingSongs = () => (
    <DigitLayout.Column centerHorizontal padding="50">
        <DigitText.Text text={"There were no songs matching your search.."} />
    </DigitLayout.Column>
);


export default Songs;
