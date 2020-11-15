import React, { useEffect, useState } from "react";
import {
    DigitEditDataCard,
    DigitTextField,
    DigitTextArea,
    DigitAutocompleteSelectMultiple,
    DigitDesign, DigitButton, DigitIconButton,
} from "@cthit/react-digit-components";
import { getTags } from "../../../api/tags/get.tags.api";
import { addSong } from "../../../api/songs/post.songs.api";
import * as yup from "yup";
import { EditCenter, EditContainer, TopRightButton } from "../common-ui/Create.styles";
import { ArrowBackRounded } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const CreateSong = () => {
    const [tags, setTags] = useState([]);
    let history = useHistory();

    useEffect(() => {
        getTags().then(res => {
            const tags = Object.values(res.data.data.tags)
            setTags(
                tags.map(tag => {
                        return { text: tag.name, value: tag.tag_id };
                    })
                    .sort((a, b) => (a.text > b.text ? 1 : -1))
            );
        });
    }, []);

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
                <DigitEditDataCard
                    hasButtons
                    alignSelf
                    justifySelf
                    onSubmit={(values, actions) => {
                        addSong(values).then(res => {
                            history.push("/edit/" + res.data.data.song_id)
                        })
                    }}
                    initialValues={{
                        title: "",
                        author: "...",
                        melody: "...",
                        text: "",
                        tags: [],
                    }}
                    validationSchema={yup.object().shape({
                        title: yup.string().required("This can't be empty"),
                        author: yup.string(),
                        melody: yup.string(),
                        text: yup.string().required("This can't be empty"),
                    })}
                    titleText={"Create a song"}
                    submitText={"Save song"}
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
                        text: "Create",
                    }}
                />
            </EditCenter>
        </EditContainer>
    );
};

export default CreateSong;
