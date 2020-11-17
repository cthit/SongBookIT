import React, { useEffect, useState } from "react";
import {
    DigitEditDataCard,
    DigitTextField,
    DigitTextArea,
    DigitAutocompleteSelectMultiple,
    DigitIconButton, DigitAutocompleteSelectSingle,
} from "@cthit/react-digit-components";
import { getTags } from "../../../api/tags/get.tags.api";
import { addSong } from "../../../api/songs/post.songs.api";
import * as yup from "yup";
import { CenterContainer, ColumnContainer, TopRightButton } from "../common-ui/Common.styles";
import { ArrowBackRounded } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { getNbrSong } from "../../../api/songs/get.songs.api";
import { ErrorTextCard } from "../common-ui/Error";

const CreateSong = () => {
    const [tags, setTags] = useState([]);
    const [numbers, setNumbers] = useState([]);
    const [error, setError] = useState({isError: false, message: ""})
    let history = useHistory();

    useEffect(() => {
        getTags().then(res => {
            const tags_res = Object.values(res.data.data.tags)
            setTags(
                tags_res.map(tag => ({ text: tag.name, value: tag.tag_id }))
                    .sort((a, b) => (a.text > b.text ? 1 : -1))
            );
        });
    }, []);

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
            <CenterContainer>
                {error.isError && <ErrorTextCard message={error.message} />}
                <DigitEditDataCard
                    hasButtons
                    alignSelf
                    justifySelf
                    onSubmit={(values, actions) => {
                        addSong(values).then(res => {
                            history.push("/songs/edit/" + res.data.data.song_id)
                        })  .catch(error => {
                            console.log('response: ', error.response.data.error);
                            setError(error.response.data.error)
                        })
                    }}
                    initialValues={{
                        title: "",
                        number: [],
                        author: "",
                        melody: "",
                        text: "",
                        tags: [],
                    }}
                    validationSchema={yup.object().shape({
                        title: yup.string().required("This can't be empty"),
                        number: yup.number().required("This can't be empty"),
                        author: yup.string(),
                        melody: yup.string(),
                        text: yup.string().required("This can't be empty"),
                    })}
                    titleText={"Create a song"}
                    submitText={"Save song"}
                    keysOrder={["title", "number", "author", "melody", "text", "tags"]}
                    keysComponentData={{
                        title: {
                            component: DigitTextField,
                            componentProps: {
                                upperLabel: "Title",
                            },
                        },
                        number: {
                            component: DigitAutocompleteSelectSingle,
                            componentProps: {
                                upperLabel: "Song Number",
                                options: numbers,
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
                        text: "Create",
                    }}
                />
            </CenterContainer>
        </ColumnContainer>
    );
};

export default CreateSong;
