import React, {useState, useMemo, useEffect} from "react";
import {
    DigitLayout,
    DigitFAB,
    DigitDesign,
    DigitText,
    DigitMarkdown,
    DigitLoading,
    useDigitCustomDialog,
    DigitButton,
    DigitTextField,
    DigitChip,
    DigitAutocompleteSelectMultiple,
} from "@cthit/react-digit-components";
import Add from "@material-ui/icons/Add";

import {useStateValue, StateActions} from "../../app/App.context";
import styled from "styled-components";

const TagFilter = () => {
    const [{tags}, dispatch] = useStateValue();

    const options = tags
        .map(tag => {
            return {text: tag.name, value: tag.tag_id};
        })
        .sort((a, b) => (a.text > b.text ? 1 : -1));
    const [value, setValue] = useState([]);

    return (
        <DigitAutocompleteSelectMultiple
            outlined
            upperLabel="Filter the songs by tags"
            options={options}
            value={value}
            onChange={e => {
                setValue(e.target.value);
                dispatch({
                    type: StateActions.filterTags,
                    tags: value,
                });
            }}
        />
    );
};

const SearchField = () => {
    const [searchText, setSearchText] = useState("");
    const [{}, dispatch] = useStateValue();

    return (
        <DigitTextField
            value={searchText}
            upperLabel="Search for a song"
            onChange={e => {
                setSearchText(e.target.value);
                dispatch({
                    type: StateActions.filterSearch,
                    search: searchText,
                });
            }}
            outlined
        />
    );
};

const SearchBar = () => (
    <DigitDesign.Card>
        <DigitDesign.CardBody>
            <SearchField/>
            <TagFilter/>
        </DigitDesign.CardBody>
    </DigitDesign.Card>
);

const SongDetails = s => {
    return {
        title: s.title,
        renderMain: () => (
            <>
                <DigitText.Text bold text={"Text: " + s.author}/>
                <DigitText.Text text={"Mel: " + s.melody}/>
                <DigitMarkdown markdownSource={s.text}/>
            </>
        ),
        renderButtons: (confirm, cancel) => (
            <>
                <DigitButton text={"Close song"} raised onClick={cancel}/>
                <DigitButton
                    text={"Edit song"}
                    primary
                    raised
                    submit
                    onClick={confirm}
                />
            </>
        ),
        onCancel: () => {
        },
        onConfirm: () => console.log("wawawawawawa"),
    };
};

const GridOfSongs = ({songs, tags}) => {
    const [openDialog] = useDigitCustomDialog();
    const [{filterSearch}] = useStateValue();
    const [filteredSongs, setFilteredSongs] = useState(songs);

    useEffect(() => {
        if (filterSearch === "") {
            setFilteredSongs(songs);
        } else {
            setFilteredSongs(
                songs.filter(song =>
                    song.title
                        .toLowerCase()
                        .includes(filterSearch.toLowerCase())
                )
            );
        }
    }, [filterSearch]);

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
                            onClick={() => openDialog(SongDetails(s))}
                        >
                            <DigitDesign.CardBody style={{cursor: "pointer"}}>
                                <>
                                    <DigitText.Title text={s.title}/>
                                    <DigitText.Text
                                        bold
                                        text={"Författare: " + s.author}
                                    />
                                    <DigitText.Text text={"Mel: " + s.melody}/>
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

const Margin = styled.div`
    padding: 15px;
`;

const NoSongs = () => (
    <DigitLayout.Column centerHorizontal>
        <DigitLoading loading size={80}/>
    </DigitLayout.Column>
);
const NoMatchingSongs = () => (
    <DigitLayout.Column centerHorizontal padding="50">
        <DigitText.Text text={"There were no songs matching your search.."}/>
    </DigitLayout.Column>
);

const Songs = () => {
    const [
        {filteredSongs, songs, getSongs, tags},
        dispatch,
    ] = useStateValue();

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
                <SearchBar/>
                <Margin>
                    {songs.length === 0 && <NoSongs/>}
                    {songs.length !== 0 && (
                        <GridOfSongs songs={songs} tags={tags}/>
                    )}
                </Margin>
            </DigitLayout.Column>


            <DigitLayout.DownRightPosition>
                <DigitFAB
                    icon={Add}
                    secondary
                    onClick={() => console.log("wow cool")}
                />
            </DigitLayout.DownRightPosition>


        </>
    );
};

export default Songs;
