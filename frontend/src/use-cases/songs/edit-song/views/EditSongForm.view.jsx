import {useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {ErrorTextCard} from "../../../../common/elements/Error";
import {
    DigitAutocompleteSelectMultiple,
    DigitButton, DigitChip, DigitDesign,
    DigitEditDataCard, DigitForm, DigitLayout, DigitMarkdown, DigitText,
    DigitTextArea,
    DigitTextField, useDigitCustomDialog, useDigitDialog, useDigitFormField,
    useDigitToast,
    useDigitTranslations
} from "@cthit/react-digit-components";
import {editSong} from "../../../../api/songs/put.songs.api";
import * as yup from "yup";
import {deleteSong} from "../../../../api/songs/delete.songs.api";
import {navEditSong, navHome, navViewSong} from "../../../../app/App.Routes";
import {getTags} from "../../../../api/tags/get.tags.api";
import {addSong} from "../../../../api/songs/post.songs.api";
import {SongContainer} from "../../view-songs/views/elements/song-detail/SongDetail.view";
import {useSongTag} from "../../contexts/Songs.context";

const defineDeleteDialog = (text, deleteFunction) => ({
    renderMain: () => (<DigitText.Text bold text={text.DeleteSongConfirm}/>),
    renderButtons: (confirm, cancel) => (
        <>
            <DigitButton
                text={text.DeleteSong}
                secondary
                raised
                submit
                onClick={confirm}
            />

            <DigitButton text={text.Cancel} raised primary onClick={cancel}/>
        </>
    ),
    onConfirm: () => deleteFunction()
})

const EditSongForm = ({tags, song}) => {
    let history = useHistory();
    const [text] = useDigitTranslations();
    const [queueToast] = useDigitToast();
    const {loadSongs} = useSongTag()
    const [error, setError] = useState({isError: false, message: ""});

    const TitleField = () => {
        const fieldValues = useDigitFormField("title");
        return <DigitTextField size={{width: "100%"}} {...fieldValues} upperLabel={text.Title}/>;
    };
    const AuthorField = () => {
        const fieldValues = useDigitFormField("author");
        return <DigitTextField size={{width: "100%"}} {...fieldValues} upperLabel={text.Author}/>;
    };
    const MelodyField = () => {
        const fieldValues = useDigitFormField("melody");
        return <DigitTextField size={{width: "100%"}} {...fieldValues} upperLabel={text.Melody}/>;
    };
    const TextField = () => {
        const fieldValues = useDigitFormField("text");
        return <DigitTextArea size={{width: "100%"}} rowsMax={40} {...fieldValues} upperLabel={text.Text} primary/>;
    };
    const TagsField = () => {
        const fieldValues = useDigitFormField("tags");
        return <DigitAutocompleteSelectMultiple size={{width: "100%"}}  {...fieldValues} upperLabel={text.Tags}
                                                options={tags}/>;
    };

    const performDelete = () => {
        deleteSong(song.song_id)
            .then(() => {
                queueToast({
                    text: text.DeleteSongSuccessful
                });
                navHome(history);
                loadSongs()
            })
            .catch(() => {
                queueToast({
                    text: text.DeleteSongFailed
                });
            });
    }

    const performUpdate = (values) => {
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
    }

    const [openDeleteDialog] = useDigitCustomDialog();

    return <DigitForm
        initialValues={{
            title: song.title,
            author: song.author,
            melody: song.melody,
            text: song.text,
            tags: song.tags
        }} onSubmit={(values,) => performUpdate(values, song)}
        render={() =>
            <>
                {error.isError && <ErrorTextCard message={error.message}/>}
                <DigitDesign.Card size={{width: "min(80vw, 600px)"}}>
                    <DigitDesign.CardBody>
                        <DigitLayout.Column>
                            <DigitText.Heading5 text={text.EditSong + ": Nr." + song.number + " " + song.title}/>
                            <TitleField/>
                            <AuthorField/>
                            <MelodyField/>
                            <TextField/>
                            <TagsField/>
                            <DigitButton raised submit text={text.Save} primary/>
                            <DigitButton raised text={text.DeleteSong} secondary onClick={() => openDeleteDialog(defineDeleteDialog(text, performDelete))}/>
                        </DigitLayout.Column>
                    </DigitDesign.CardBody>
                </DigitDesign.Card>
            </>
        } validationSchema={yup.object().shape({
        title: yup.string().required(text.CantBeEmpty),
        author: yup.string(),
        melody: yup.string(),
        text: yup.string().required(text.CantBeEmpty)
    })}/>
}


export default EditSongForm;
