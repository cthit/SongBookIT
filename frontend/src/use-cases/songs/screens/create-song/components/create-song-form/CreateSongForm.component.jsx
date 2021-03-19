import { useHistory } from "react-router-dom";
import {
    DigitButton,
    DigitForm,
    DigitIconButton,
    DigitLayout,
    DigitText,
    useDigitToast,
    useDigitTranslations
} from "@cthit/react-digit-components";
import React, { useEffect, useState } from "react";
import { addSong } from "../../../../../../api/songs/post.songs.api";
import { navViewSong } from "../../../../../../app/App.routes";
import * as yup from "yup";
import { useSongTag } from "../../../../Songs.context";
import {
    SongFormCard,
    SongFormFields,
    songInitialValues,
    songValidationSchema
} from "../../../../components/song-form/SongForm.utils";
import FiveZeroZeroComponent from "../../../../../../common/components/five-zero-zero";
import ErrorCard from "../../../../../../common/components/error-card";
import { ArrowBack } from "@material-ui/icons";

export const CreateSongForm = () => {
    const { tags, loadSongs, loadTags } = useSongTag();
    let history = useHistory();
    const [queueToast] = useDigitToast();

    const [text] = useDigitTranslations();
    const [error, setError] = useState({ isError: false, message: "" });
    const [somethingWrong, setSomethingWrong] = useState(false);

    useEffect(() => loadTags(), []);

    const performCreate = values => {
        addSong(values)
            .then(res => {
                queueToast({
                    text: text.AddSongSuccessful
                });
                navViewSong(history, res.data.data.song_id);
                loadSongs();
            })
            .catch(error => {
                queueToast({
                    text: text.AddSongFailed
                });
                const e = error.response.data.error;
                setError({ isError: e.isError, message: text[e.message] });
                if (!text[e.message]) {
                    setSomethingWrong(true);
                }
            });
    };

    if (somethingWrong) {
        return <FiveZeroZeroComponent />;
    }

    return (
        <DigitForm
            initialValues={songInitialValues()}
            validationSchema={songValidationSchema(yup, text)}
            onSubmit={values => performCreate(values)}
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
                                <DigitText.Heading6
                                    alignCenter
                                    text={text.AddSong}
                                />
                            </DigitLayout.Row>
                            <SongFormFields text={text} tags={tags} />
                            <DigitButton
                                raised
                                submit
                                text={text.Save}
                                primary
                                disabled={Object.keys(errors).length !== 0}
                            />
                        </SongFormCard>
                    </>
                );
            }}
        />
    );
};
