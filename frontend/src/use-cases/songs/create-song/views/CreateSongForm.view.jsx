import {useHistory} from "react-router-dom";
import {
    DigitButton, DigitForm, DigitText,
    useDigitToast,
    useDigitTranslations
} from "@cthit/react-digit-components";
import React, {useEffect, useState} from "react";
import {addSong} from "../../../../api/songs/post.songs.api";
import {navViewSong} from "../../../../app/App.Routes";
import {ErrorTextCard} from "../../../../common/elements/Error";
import * as yup from "yup";
import {useSongTag} from "../../Songs.context";
import {
    SongFormCard,
    SongFormFields,
    songInitialValues,
    songValidationSchema,
    tagsToTagsOptions
} from "../../form-utils/SongForm.utils";
import FiveZeroZero from "../../../../common/elements/FiveZeroZero";

const CreateSongForm = () => {
    const {tags, loadSongs, loadTags} = useSongTag()
    let history = useHistory();
    const [queueToast] = useDigitToast();
    const [text] = useDigitTranslations();
    const [error, setError] = useState({isError: false, message: ""});
    const [somethingWrong, setSomethingWrong] = useState(false)

    useEffect(() => loadTags(), [])

    const performCreate = (values) => {
        addSong(values)
            .then(res => {
                queueToast({
                    text: text.AddSongSuccessful
                });
                navViewSong(history, res.data.data.song_id);
                loadSongs()
            })
            .catch(error => {
                queueToast({
                    text: text.AddSongFailed
                });
                const e = error.response.data.error
                setError({isError: e.isError, message: text[e.message]})
                if (text[e.message]) {
                    setSomethingWrong(true)
                }
            });
    }

    if (somethingWrong) {
        return <FiveZeroZero/>
    }

    return <DigitForm
        initialValues={songInitialValues()}
        validationSchema={songValidationSchema(yup, text)}
        onSubmit={(values,) => performCreate(values, setError, text, queueToast, history, loadSongs)}
        render={({errors}) => {
            return <>
                {error.isError && <ErrorTextCard message={error.message}/>}
                <SongFormCard>
                    <DigitText.Heading5 text={text.AddSong}/>
                    <SongFormFields text={text} tagOptions={tagsToTagsOptions(tags)}/>
                    <DigitButton raised submit text={text.Save} primary disabled={Object.keys(errors).length !== 0}/>
                </SongFormCard>

            </>
        }
        }/>
}

export default CreateSongForm;