import { useHistory } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import {
    DigitButton,
    DigitForm,
    DigitIconButton,
    DigitLayout,
    DigitLoading,
    DigitText,
    useDigitCustomDialog,
    useDigitToast,
    useDigitTranslations
} from "@cthit/react-digit-components";
import { editSong } from "../../../../../../api/songs/put.songs.api";
import * as yup from "yup";
import { deleteSong } from "../../../../../../api/songs/delete.songs.api";
import { navHome, navViewSong } from "../../../../../../app/App.routes";
import { useSongs } from "../../../../../songs/Songs.context";
import {
    SongFormCard,
    SongFormFields,
    songInitialValues,
    songValidationSchema
} from "../../../../components/song-form/SongForm.utils";
import ErrorCard from "../../../../../../common/components/error-card";
import { ArrowBack } from "@material-ui/icons";

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

export const EditSongForm = ({ song, setSomethingWrong }) => {
    const history = useHistory();
    const [text] = useDigitTranslations();
    const [queueToast] = useDigitToast();
    const [loading, setLoading] = useState(true);
    const [openDeleteDialog] = useDigitCustomDialog();
    const [error, setError] = useState({ isError: false, message: "" });

    const { tags, refetchSongsAndTags, refetchTags } = useSongs();

    useEffect(() => {
        refetchTags().then(() => setLoading(false));
    }, [refetchTags]);

    const performUpdate = useCallback(
        async values => {
            try {
                await editSong(song.song_id, values);
                queueToast({
                    text: text.EditSongSuccessful
                });
                await refetchSongsAndTags();
                navViewSong(history, song.song_id);
            } catch (error) {
                queueToast({
                    text: text.EditSongFailed
                });
                if (error.response.status === 500) {
                    setSomethingWrong(true);
                } else {
                    setError({
                        isError: error.response.data.error.isError,
                        message: text[error.response.data.error.message]
                    });
                }
            }
        },
        [
            song,
            text,
            queueToast,
            refetchSongsAndTags,
            history,
            setSomethingWrong
        ]
    );

    const performDelete = useCallback(async () => {
        try {
            await deleteSong(song.song_id);
            queueToast({
                text: text.DeleteSongSuccessful
            });
            await refetchSongsAndTags();
            navHome(history);
        } catch (error) {
            queueToast({
                text: text.DeleteSongFailed
            });
            if (error.response.status === 500) {
                setSomethingWrong(true);
            } else {
                setError({
                    isError: error.response.data.error.isError,
                    message: text[error.response.data.error.message]
                });
            }
        }
    }, [
        song,
        history,
        text,
        queueToast,
        setSomethingWrong,
        refetchSongsAndTags
    ]);

    if (loading) {
        return (
            <DigitLoading
                margin={{ left: "auto", right: "auto", top: "32px" }}
                loading={loading}
            />
        );
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
                            <DigitLayout.Row alignItems={"center"}>
                                <DigitIconButton
                                    icon={ArrowBack}
                                    onClick={() => history.goBack()}
                                />
                                <DigitText.Text
                                    bold
                                    text={
                                        text.EditSong +
                                        ": Nr." +
                                        song.number +
                                        " " +
                                        song.title
                                    }
                                />
                            </DigitLayout.Row>

                            <SongFormFields text={text} tags={tags} />

                            <DigitLayout.Row justifyContent={"space-between"}>
                                <DigitButton
                                    raised
                                    secondary
                                    text={text.DeleteSong}
                                    onClick={() =>
                                        openDeleteDialog(
                                            defineDeleteDialog(text, () =>
                                                performDelete()
                                            )
                                        )
                                    }
                                />

                                <DigitButton
                                    raised
                                    submit
                                    primary
                                    text={text.Save}
                                    disabled={Object.keys(errors).length !== 0}
                                />
                            </DigitLayout.Row>
                        </SongFormCard>
                    </>
                );
            }}
        />
    );
};
