import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
    DigitButton,
    DigitForm,
    DigitText,
    useDigitCustomDialog,
    useDigitToast,
    useDigitTranslations
} from "@cthit/react-digit-components";
import { editSong } from "../../../../../../api/songs/put.songs.api";
import * as yup from "yup";
import { deleteSong } from "../../../../../../api/songs/delete.songs.api";
import { navHome, navViewSong } from "../../../../../../app/App.routes";
import { useSongTag } from "../../../../Songs.context";
import {
    SongFormCard,
    SongFormFields,
    songInitialValues,
    songValidationSchema
} from "../../../../components/song-form/SongForm.utils";
import ErrorCard from "../../../../../../common/components/error-card";
import FiveZeroZeroComponent from "../../../../../../common/components/five-zero-zero";

const defineDeleteDialog = (text, deleteFunction) => ({
    renderMain: () => <DigitText.Text bold text={text.DeleteSongConfirm} />,
    renderButtons: (confirm, cancel) => (
        <>
            <DigitButton
                text={text.DeleteSong}
                secondary
                raised
                submit
                onClick={confirm}
            />

            <DigitButton text={text.Cancel} raised primary onClick={cancel} />
        </>
    ),
    onConfirm: () => deleteFunction()
});

export const EditSongForm = ({ song }) => {
    let history = useHistory();
    const [text] = useDigitTranslations();
    const [queueToast] = useDigitToast();
    const { tags, loadSongs, loadTags } = useSongTag();
    const [error, setError] = useState({ isError: false, message: "" });

    const [somethingWrong, setSomethingWrong] = useState(false);

    useEffect(() => loadTags(), []);

    const performDelete = () => {
        deleteSong(song.song_id)
            .then(() => {
                queueToast({
                    text: text.DeleteSongSuccessful
                });
                navHome(history);
                loadSongs();
            })
            .catch(() => {
                queueToast({
                    text: text.DeleteSongFailed
                });
                const e = error.response.data.error;
                setError({ isError: e.isError, message: text[e.message] });
                if (text[e.message]) {
                    setSomethingWrong(true);
                }
            });
    };

    const performUpdate = values => {
        editSong(song.song_id, values)
            .then(() => {
                queueToast({
                    text: text.EditSongSuccessful
                });
                navViewSong(history, song.song_id);
                loadSongs();
            })

            .catch(error => {
                queueToast({
                    text: text.EditSongFailed
                });
                const e = error.response.data.error;
                setError({ isError: e.isError, message: text[e.message] });
                if (!text[e.message]) {
                    setSomethingWrong(true);
                }
            });
    };

    const [openDeleteDialog] = useDigitCustomDialog();

    if (somethingWrong) {
        return <FiveZeroZeroComponent />;
    }

    return (
        <DigitForm
            initialValues={songInitialValues(song)}
            validationSchema={songValidationSchema(yup, text)}
            onSubmit={values => performUpdate(values)}
            render={({ errors }) => {
                return (
                    <>
                        {error.isError && <ErrorCard message={error.message} />}
                        <SongFormCard>
                            <DigitText.Heading5
                                text={
                                    text.EditSong +
                                    ": Nr." +
                                    song.number +
                                    " " +
                                    song.title
                                }
                            />

                            <SongFormFields text={text} tags={tags} />
                            <DigitButton
                                raised
                                submit
                                primary
                                text={text.Save}
                                disabled={Object.keys(errors).length !== 0}
                            />
                            <DigitButton
                                raised
                                secondary
                                text={text.DeleteSong}
                                onClick={() =>
                                    openDeleteDialog(
                                        defineDeleteDialog(text, performDelete)
                                    )
                                }
                            />
                        </SongFormCard>
                    </>
                );
            }}
        />
    );
};
