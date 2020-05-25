import React, { useState, useMemo, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import styled from "styled-components";

const GridOfSongs = ({ songs, tags }) => {
    const [openDialog] = useDigitCustomDialog();
    const [{ filterSearch, filterTags }] = useStateValue();
    const [filteredSongs, setFilteredSongs] = useState(songs);

    useEffect(() => {
        if (filterSearch === "") {
            setFilteredSongs(songs);
        } else {
            setFilteredSongs(
                filteredSongs.filter(song =>
                    song.tags.some(tag => {
                        filterTags.some(fTag => fTag.tag_id === tag.tag_id);
                    })
                )
            );
            setFilteredSongs(
                songs.filter(song =>
                    song.title
                        .toLowerCase()
                        .includes(filterSearch.toLowerCase())
                )
            );
        }
    }, [filterSearch, filterTags]);

    return useMemo(
        () => (
            <DigitLayout.UniformGrid
                margin="20px"
                minItemWidth="350px"
                justifyItems="center"
            >
                {filteredSongs.map(s => (
                    <>
                        <DigitDesign.Card
                            key={s.song_id}
                            absWidth="350px"
                            onClick={() => openDialog(SongDetails(s, tags))}
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
                                                label={tag.name}
                                            />
                                        ))}
                                    </DigitLayout.Row>
                                </>
                            </DigitDesign.CardBody>
                        </DigitDesign.Card>
                    </>
                ))}
            </DigitLayout.UniformGrid>
        ),
        [JSON.stringify(filteredSongs)]
    );
};

const findTags = (tagIds, tags) => {
    return tagIds.map(id => tags.find(tag => tag.tag_id === id));
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

const Songs = () => {
    const [{ songs, getSongs, tags, filterSearch }, dispatch] = useStateValue();
    let history = useHistory();

    useEffect(() => {
        getSongs().then(res => {
            console.log(res.data.Song);
            dispatch({
                type: StateActions.getSongs,
                songs: Object.values(res.data.Song),
                tags: Object.values(res.data.Tag),
            });
        });
    }, []);

    return (
        <>
            <DigitLayout.Column>
                <SearchBar />

                {songs.length === 0 && filterSearch !== "" && (
                    <NoMatchingSongs />
                )}
                {songs.length === 0 && filterSearch === "" && <NoSongs />}
                {songs.length !== 0 && (
                    <GridOfSongs songs={songs} tags={tags} />
                )}
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

export default Songs;
