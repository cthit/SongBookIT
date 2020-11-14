import React, { useEffect, useState } from "react";
import {
    DigitEditDataCard,
    DigitTextField,
    DigitTextArea,
    DigitAutocompleteSelectMultiple,
    DigitIconButton, DigitLoading, DigitButton,
} from "@cthit/react-digit-components";
import { getTags } from "../../../api/tags/get.tags.api";
import { addSong } from "../../../api/songs/post.songs.api";
import * as yup from "yup";
import { EditCenter, EditContainer, TopRightButton } from "../common-ui/Create.styles";
import { ArrowBackRounded } from "@material-ui/icons";
import { useHistory, useParams } from "react-router-dom";
import { getSong } from "../../../api/songs/get.songs.api";
import { editSong } from "../../../api/songs/put.songs.api";
import { deleteSong } from "../../../api/songs/delete.songs.api";

const EditSong = () => {
    const [tags, setTags] = useState([]);
    let history = useHistory();
    let { song_id } = useParams();
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

    useEffect(() => {
        getTags().then(res => {
            const tags = Object.values(res.data.Tag)
            setTags(
                tags.map(tag => {
                        return { text: tag.name, value: tag.tag_id };
                    })
                    .sort((a, b) => (a.text > b.text ? 1 : -1))
            );
            setHasLoadedTag(true)
        });
    }, []);

    useEffect( () => {
        getSong(song_id).then(res => {
            setSong(res.data.song[song_id])
            setHasLoadedSong(true)
        })
    }, [])


    return (

        <EditContainer>
            <TopRightButton>
                <DigitIconButton
                icon={ArrowBackRounded}
                primary
                raised
                onClick={() => history.goBack()}
                />
            </TopRightButton>
            <EditCenter>
                {hasLoadedSong && hasLoadedTag ? <EditSongCard tags={tags} song={song} />: <DigitLoading/>}
            </EditCenter>
        </EditContainer>


    );
};


const EditSongCard = ({tags, song}) => {
    let history = useHistory();

return <>
    <DigitEditDataCard
        hasButtons
        onSubmit={(values, actions) => {
            editSong(song.song_id, values);
            history.push("/")
        }}
        initialValues={{
            title: song.title,
            author: song.author,
            melody: song.melody,
            text: song.text,
            tags: song.tags,
        }}
        validationSchema={yup.object().shape({
            title: yup.string().required("This can't be empty"),
            author: yup.string().required("This can't be empty"),
            melody: yup.string().required("This can't be empty"),
            text: yup.string().required("This can't be empty"),
        })}
        titleText={"Edit: " + song.title}
        submitText={"Edit song"}
        keysOrder={["title", "author", "melody", "text", "tags"]}
        keysComponentData={{
            title: {
                component: DigitTextField,
                componentProps: {
                    upperLabel: "Title",
                },
            },
            author: {
                component: DigitTextField,
                componentProps: {
                    upperLabel: "Author",
                },
            },
            melody: {
                component: DigitTextField,
                componentProps: {
                    upperLabel: "Melody",
                },
            },
            text: {
                component: DigitTextArea,
                componentProps: {
                    primary: true,
                    upperLabel: "Text",
                },
            },
            tags: {
                component: DigitAutocompleteSelectMultiple,
                componentProps: {
                    upperLabel: "Give your song tags",
                    options: tags,
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
        history.push("/");
        history.go(0); // force-reload
    }}
    />
</>
}

export default EditSong;
