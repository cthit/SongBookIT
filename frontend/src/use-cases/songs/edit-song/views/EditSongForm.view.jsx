import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { ErrorTextCard } from "../../../../common/elements/Error";
import {
    DigitAutocompleteSelectMultiple,
    DigitButton,
    DigitEditDataCard,
    DigitTextArea,
    DigitTextField,
    useDigitToast,
    useDigitTranslations
} from "@cthit/react-digit-components";
import { editSong } from "../../../../api/songs/put.songs.api";
import * as yup from "yup";
import { deleteSong } from "../../../../api/songs/delete.songs.api";
import { navHome, navViewSong } from "../../../../app/App.Routes";

const EditSongForm = ({ tags, song }) => {
    let history = useHistory();
    const [text] = useDigitTranslations();
    const [error, setError] = useState({ isError: false, message: "" });
    const [queueToast] = useDigitToast();

    return (
        <>
            {error.isError && <ErrorTextCard message={error.message} />}
            <DigitEditDataCard
                hasButtons
                size={{ width: "min(80vw, 600px)" }}
                onSubmit={(values, actions) => {
                    values["song_id"] = song.song_id;
                    editSong(song.song_id, values)
                        .then(() => {
                            queueToast({
                                text: text.EditSongSuccessful
                            });
                            navViewSong(history, song.song_id);
                        })

                        .catch(error => {
                            queueToast({
                                text: text.EditSongFailed
                            });
                            setError(error.response.data.error);
                        });
                }}
                initialValues={{
                    title: song.title,
                    author: song.author,
                    melody: song.melody,
                    text: song.text,
                    tags: song.tags
                }}
                validationSchema={yup.object().shape({
                    title: yup.string().required(text.CantBeEmpty),
                    author: yup.string(),
                    melody: yup.string(),
                    text: yup.string().required(text.CantBeEmpty)
                })}
                titleText={
                    text.EditSong + ": Nr." + song.number + " " + song.title
                }
                submitText={text.Save}
                keysOrder={["title", "author", "melody", "text", "tags"]}
                keysComponentData={{
                    title: {
                        component: DigitTextField,
                        componentProps: {
                            upperLabel: text.Title,
                            size: { width: "min(60vw, 550px)" }
                        }
                    },
                    author: {
                        component: DigitTextField,
                        componentProps: {
                            upperLabel: text.Author,
                            size: { width: "min(60vw, 550px)" }
                        }
                    },
                    melody: {
                        component: DigitTextField,
                        componentProps: {
                            upperLabel: text.Melody,
                            size: { width: "min(60vw, 550px)" }
                        }
                    },
                    text: {
                        component: DigitTextArea,
                        componentProps: {
                            primary: true,
                            upperLabel: text.Tags,
                            size: { width: "min(60vw, 550px)" }
                        }
                    },
                    tags: {
                        component: DigitAutocompleteSelectMultiple,
                        componentProps: {
                            upperLabel: text.tags,
                            options: tags,
                            size: { width: "min(60vw, 550px)" }
                        }
                    }
                }}
                submitButton={{
                    text: text.Save
                }}
            />
            <DigitButton
                secondary
                text={text.DeleteSong}
                raised
                onClick={() => {
                    deleteSong(song.song_id)
                        .then(() => {
                            queueToast({
                                text: text.DeleteSongSuccessful
                            });
                            navHome(history);
                            history.go(0); // force-reload})
                        })
                        .catch(() => {
                            queueToast({
                                text: text.DeleteSongFailed
                            });
                        });
                }}
            />
        </>
    );
};

export default EditSongForm;
