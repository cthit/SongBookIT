import React, { useEffect, useState } from "react";
import {
    DigitEditDataCard,
    DigitTextField,
    DigitTextArea,
    DigitAutocompleteSelectMultiple,
    DigitIconButton, DigitLoading, DigitButton, DigitAutocompleteSelectSingle,
} from "@cthit/react-digit-components";
import { getTags } from "../../../api/tags/get.tags.api";
import * as yup from "yup";
import { CenterContainer, ColumnContainer, TopRightButton, WideCenterContainer } from "../common-ui/Common.styles";
import { ArrowBackRounded } from "@material-ui/icons";
import { useHistory, useParams } from "react-router-dom";
import { getNbrSong, getSong } from "../../../api/songs/get.songs.api";
import { editSong } from "../../../api/songs/put.songs.api";
import { deleteSong } from "../../../api/songs/delete.songs.api";
import { ErrorTextCard } from "../common-ui/Error";

const EditSong = () => {
    let history = useHistory();
    let { song_id } = useParams();
    const [tags, setTags] = useState([]);
    const [numbers, setNumbers] = useState([]);
    const [song, setSong] = useState({
        "song_id": "",
        "title": "",
        "melody": "",
        "text": "",
        "author": "",
        "tags": []
    });
    const [hasLoadedSong, setHasLoadedSong] = useState(false)
    const [hasLoadedTag, setHasLoadedTag] = useState(false)
    const [loadSongError, setLoadSongError] = useState({ isError:false, message: "" })

    useEffect(() => {
        getTags().then(res => {
            const tags = Object.values(res.data.data.tags)
            setTags(
                tags.map(tag => {
                        return { text: tag.name, value: tag.tag_id };
                    })
                    .sort((a, b) => (a.text > b.text ? 1 : -1))
            );
            setHasLoadedTag(true)
        }).catch();
    }, []);

    useEffect( () => {
        getSong(song_id).then(res => {
            setSong(res.data.data.song)
            setHasLoadedSong(true)
        }).catch((err) => {
            setLoadSongError(err.response.data.error)
            setHasLoadedSong(false)
        })
    }, [])

    useEffect(() => {
        getNbrSong().then( res => {
            setNumbers(res.data.data.numbers.map(number => ({text: "nr. " + number, value: number})))
        })
    }, [])


    return (

        <ColumnContainer>
            <TopRightButton>
                <DigitIconButton
                icon={ArrowBackRounded}
                primary
                raised
                onClick={() => history.goBack()}
                />
            </TopRightButton>
            <WideCenterContainer>
                {loadSongError.isError && <ErrorTextCard message={loadSongError.message}/> }
                {hasLoadedSong && hasLoadedTag ? <EditSongColumn tags={tags} song={song} numbers={numbers} />: (loadSongError ? <div/> : <DigitLoading/>)}
            </WideCenterContainer>
        </ColumnContainer>


    )
}

const EditSongColumn = ({tags, song, numbers}) => {
    let history = useHistory();
    const [error, setError] = useState({isError: false, message: ""})

return <>

    {error.isError && <ErrorTextCard message={error.message} />}
    <DigitEditDataCard
        hasButtons
        onSubmit={(values, actions) => {
            values['song_id'] = song.song_id
            editSong(song.song_id, values)
                .then(() => history.push("/songs/" + song.song_id))
                .catch(error => {
                console.log('response: ', error.response.data.error);
                setError(error.response.data.error)
            });
        }}
        initialValues={{
            title: song.title,
            number: song.number,
            author: song.author,
            melody: song.melody,
            text: song.text,
            tags: song.tags,
        }}
        validationSchema={yup.object().shape({
            title: yup.string().required("This can't be empty"),
            number: yup.number().required("This can't be empty"),
            author: yup.string(),
            melody: yup.string(),
            text: yup.string().required("This can't be empty"),
        })}
        titleText={"Edit: " + song.title}
        submitText={"Confirm edit"}
        keysOrder={["title", "number", "author", "melody", "text", "tags"]}
        keysComponentData={{
            title: {
                component: DigitTextField,
                componentProps: {
                    upperLabel: "Title",
                    size: {width: "90%"}
                },
            },
            number: {
                component: DigitAutocompleteSelectSingle,
                componentProps: {
                    upperLabel: "Song Number",
                    options: numbers,
                    size: {width: "90%"}
                },
            },
            author: {
                component: DigitTextField,
                componentProps: {
                    upperLabel: "Author",
                    size: {width: "90%"}
                },
            },
            melody: {
                component: DigitTextField,
                componentProps: {
                    upperLabel: "Melody",
                    size: {width: "90%"}
                },
            },
            text: {
                component: DigitTextArea,
                componentProps: {
                    primary: true,
                    upperLabel: "Text",
                    size: {width: "90%"}
                },
            },
            tags: {
                component: DigitAutocompleteSelectMultiple,
                componentProps: {
                    upperLabel: "Give your song tags",
                    options: tags,
                    size: {width: "90%"},
                    style: {fontSize:"5px"}
                },
            },
        }}
        submitButton={{
            text: "Edit",
        }}
    />
    <DigitButton
    secondary
    text={"Delete song :("}
    raised
    onClick={() => {
        deleteSong(song.song_id);
        history.push("/songs/");
        history.go(0); // force-reload
    }}
    />
</>
}

export default EditSong
