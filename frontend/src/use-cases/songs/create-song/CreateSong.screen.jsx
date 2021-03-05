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
import { CenterContainer, ColumnContainer, TopRightButton } from "../../../common-ui/Common.styles";
import { ArrowBackRounded } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { ErrorTextCard } from "../../../common-ui/Error";
import useAdmin from "../../../common/hooks/use-admin";
import InsufficientAccess from "../../../common/InsufficientAccess";

const CreateSong = () => {
    const [tags, setTags] = useState([]);
    const [error, setError] = useState({isError: false, message: ""})
    let history = useHistory();


    const admin = useAdmin();


    useEffect(() => {
        getTags().then(res => {
            const tags_res = Object.values(res.data.data.tags)
            setTags(
                tags_res.map(tag => ({ text: tag.name, value: tag.tag_id }))
                    .sort((a, b) => (a.text > b.text ? 1 : -1))
            );
        });
    }, []);


    if (!admin) {
        return <InsufficientAccess/>
    }

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
                            setError(error.response.data.error)
                        })
                    }}
                    initialValues={{
                        title: "",
                        author: "",
                        melody: "",
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
            </CenterContainer>
        </ColumnContainer>
    );
};

export default CreateSong;
