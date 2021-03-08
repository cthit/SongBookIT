import React, {useEffect, useState} from "react";
import {
    DigitEditDataCard,
    DigitTextField,
    DigitTextArea,
    DigitAutocompleteSelectMultiple,
    DigitIconButton,
    useDigitTranslations,
    useDigitToast
} from "@cthit/react-digit-components";
import {getTags} from "../../../api/tags/get.tags.api";
import {addSong} from "../../../api/songs/post.songs.api";
import * as yup from "yup";
import {
    CenterContainer,
    ColumnContainer,
    TopRightButton
} from "../../../common-ui/design/Common.styles";
import {ArrowBackRounded} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import {ErrorTextCard} from "../../../common/elements/Error";
import useAdmin from "../../../common/hooks/use-admin";
import InsufficientAccess from "../../../common/views/InsufficientAccess";
import {navEditSong} from "../../../app/App.Routes";

const CreateSong = () => {
    const [tags, setTags] = useState([]);
    const [error, setError] = useState({isError: false, message: ""});
    let history = useHistory();
    const [text] = useDigitTranslations();
    const [queueToast] = useDigitToast();

    const admin = useAdmin();

    useEffect(() => {
        getTags().then(res => {
            const tags_res = Object.values(res.data.data.tags);
            setTags(
                tags_res
                    .map(tag => ({text: tag.name, value: tag.tag_id}))
                    .sort((a, b) => (a.text > b.text ? 1 : -1))
            );
        });
    }, []);

    if (!admin) {
        return <InsufficientAccess/>;
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
                {error.isError && <ErrorTextCard message={error.message}/>}
                <DigitEditDataCard
                    hasButtons
                    alignSelf
                    justifySelf
                    onSubmit={(values, actions) => {
                        addSong(values)
                            .then(res => {
                                queueToast({
                                    text: text.AddSongSuccessful
                                });
                                navEditSong(history, res.data.data.song_id);
                            })
                            .catch(error => {
                                queueToast({
                                    text: text.AddSongFailed
                                });
                                setError(error.response.data.error);
                            });
                    }}
                    initialValues={{
                        title: "",
                        author: "",
                        melody: "",
                        text: "",
                        tags: []
                    }}
                    validationSchema={yup.object().shape({
                        title: yup.string().required(text.CantBeEmpty),
                        author: yup.string(),
                        melody: yup.string(),
                        text: yup.string().required(text.CantBeEmpty)
                    })}
                    titleText={text.AddSong}
                    submitText={text.Save}
                    keysOrder={["title", "author", "melody", "text", "tags"]}
                    keysComponentData={{
                        title: {
                            component: DigitTextField,
                            componentProps: {
                                upperLabel: text.Title
                            }
                        },
                        author: {
                            component: DigitTextField,
                            componentProps: {
                                upperLabel: text.Author
                            }
                        },
                        melody: {
                            component: DigitTextField,
                            componentProps: {
                                upperLabel: text.Melody
                            }
                        },
                        text: {
                            component: DigitTextArea,
                            componentProps: {
                                primary: true,
                                upperLabel: text.Text
                            }
                        },
                        tags: {
                            component: DigitAutocompleteSelectMultiple,
                            componentProps: {
                                upperLabel: text.Tags,
                                options: tags
                            }
                        }
                    }}
                    submitButton={{
                        text: text.Save
                    }}
                />
            </CenterContainer>
        </ColumnContainer>
    );
};

export default CreateSong;
