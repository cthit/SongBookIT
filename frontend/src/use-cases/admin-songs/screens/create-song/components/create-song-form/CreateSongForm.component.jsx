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
import React, { useCallback, useEffect, useState } from "react";
import { addSong } from "../../../../../../api/songs/post.songs.api";
import { navViewSong } from "../../../../../../app/App.routes";
import * as yup from "yup";
import { useSongs } from "../../../../../../app/Songs.context";
import {
    SongFormFields,
    songInitialValues,
    songValidationSchema
} from "../../../../components/song-form/SongForm.utils";
import ErrorCard from "../../../../../../common/components/error-card";
import { ArrowBack } from "@material-ui/icons";
import CenterLoading from "../../../../../../common/components/center-loading";
import MainFormCard from "../../../../../../common/components/main-form-card";

export const CreateSongForm = ({ setSomethingWrong }) => {
    const { tags, refetchSongsAndTags, refetchTags } = useSongs();
    const [queueToast] = useDigitToast();
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [text] = useDigitTranslations();
    const [error, setError] = useState({ isError: false, message: "" });

    useEffect(() => {
        refetchTags().then(() => setLoading(false));
    }, [refetchTags]);

    const performCreate = useCallback(
        async values => {
            try {
                const res = await addSong(values);
                queueToast({
                    text: text.AddSongSuccessful
                });
                await refetchSongsAndTags();
                navViewSong(history, res.data.data.song_id);
            } catch (error) {
                queueToast({
                    text: text.AddSongFailed
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
        [history, queueToast, setSomethingWrong, refetchSongsAndTags, text]
    );

    if (loading) {
        return <CenterLoading loading={loading} />;
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
                        <MainFormCard>
                            <DigitLayout.Row alignItems={"center"}>
                                <DigitIconButton
                                    icon={ArrowBack}
                                    onClick={() => history.goBack()}
                                />
                                <DigitText.Text
                                    bold
                                    alignCenter
                                    text={text.AddSong}
                                />
                            </DigitLayout.Row>
                            <SongFormFields tags={tags} />
                            <DigitButton
                                raised
                                submit
                                text={text.Save}
                                primary
                                disabled={Object.keys(errors).length !== 0}
                            />
                        </MainFormCard>
                    </>
                );
            }}
        />
    );
};
