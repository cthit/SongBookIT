import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { ErrorTextCard } from "../../../../common/elements/Error";
import {
    DigitAutocompleteSelectMultiple,
    DigitButton,
    DigitEditDataCard,
    DigitTextArea,
    DigitTextField
} from "@cthit/react-digit-components";
import { editSong } from "../../../../api/songs/put.songs.api";
import * as yup from "yup";
import { deleteSong } from "../../../../api/songs/delete.songs.api";

const EditSongForm = ({ tags, song }) => {
    let history = useHistory();
    const [error, setError] = useState({ isError: false, message: "" });

    return (
        <>
            {error.isError && <ErrorTextCard message={error.message} />}
            <DigitEditDataCard
                hasButtons
                size={{ width: "min(80vw, 600px)" }}
                onSubmit={(values, actions) => {
                    values["song_id"] = song.song_id;
                    editSong(song.song_id, values)
                        .then(() => history.push("/songs/" + song.song_id))
                        .catch(error => {
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
                    title: yup.string().required("This can't be empty"),
                    author: yup.string(),
                    melody: yup.string(),
                    text: yup.string().required("This can't be empty")
                })}
                titleText={"Edit: Nr." + song.number + " " + song.title}
                submitText={"Confirm edit"}
                keysOrder={["title", "author", "melody", "text", "tags"]}
                keysComponentData={{
                    title: {
                        component: DigitTextField,
                        componentProps: {
                            upperLabel: "Title",
                            size: { width: "min(60vw, 550px)" }
                        }
                    },
                    author: {
                        component: DigitTextField,
                        componentProps: {
                            upperLabel: "Author",
                            size: { width: "min(60vw, 550px)" }
                        }
                    },
                    melody: {
                        component: DigitTextField,
                        componentProps: {
                            upperLabel: "Melody",
                            size: { width: "min(60vw, 550px)" }
                        }
                    },
                    text: {
                        component: DigitTextArea,
                        componentProps: {
                            primary: true,
                            upperLabel: "Text",
                            size: { width: "min(60vw, 550px)" }
                        }
                    },
                    tags: {
                        component: DigitAutocompleteSelectMultiple,
                        componentProps: {
                            upperLabel: "Give your song tags",
                            options: tags,
                            size: { width: "min(60vw, 550px)" }
                        }
                    }
                }}
                submitButton={{
                    text: "Edit"
                }}
            />
            <DigitButton
                secondary
                text={"Delete song"}
                raised
                onClick={() => {
                    deleteSong(song.song_id);
                    history.push("/songs/");
                    history.go(0); // force-reload
                }}
            />
        </>
    );
};

export default EditSongForm;
