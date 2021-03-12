import {useHistory} from "react-router-dom";
import {
    DigitAutocompleteSelectMultiple, DigitButton, DigitDesign, DigitForm, DigitLayout, DigitText,
    DigitTextArea,
    DigitTextField,
    useDigitFormField,
    useDigitToast,
    useDigitTranslations
} from "@cthit/react-digit-components";
import React, {useEffect, useState} from "react";
import {getTags} from "../../../../api/tags/get.tags.api";
import {addSong} from "../../../../api/songs/post.songs.api";
import {navViewSong} from "../../../../app/App.Routes";
import {ErrorTextCard} from "../../../../common/elements/Error";
import * as yup from "yup";

const performCreate = (values, setError, text, queueToast, history) => {

    addSong(values)
        .then(res => {
            queueToast({
                text: text.AddSongSuccessful
            });
            navViewSong(history, res.data.data.song_id);
        })
        .catch(error => {
            queueToast({
                text: text.AddSongFailed
            });
            setError(error.response.data.error);
        });
}

const CreateSongForm = () => {
    let history = useHistory();
    const [queueToast] = useDigitToast();
    const [text] = useDigitTranslations();
    const [tags, setTags] = useState([]);
    const [error, setError] = useState({isError: false, message: ""});

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

    return <DigitForm
        initialValues={{
            title: "",
            author: "",
            melody: "",
            text: "",
            tags: []
        }}
        onSubmit={(values, actions) => performCreate(values, setError, text, queueToast, history)}
        render={() =>
            <>
                {error.isError && <ErrorTextCard message={error.message}/>}
                <DigitDesign.Card size={{width: "min(80vw, 600px)"}}>
                    <DigitDesign.CardBody>
                        <DigitLayout.Column>
                            <DigitText.Heading5 text={text.AddSong}/>
                            <TitleField/>
                            <AuthorField/>
                            <MelodyField/>
                            <TextField/>
                            <TagsField/>
                            <DigitButton raised submit text={text.Save} primary/>
                        </DigitLayout.Column>
                    </DigitDesign.CardBody>
                </DigitDesign.Card>
            </>
        }
        validationSchema={yup.object().shape({
            title: yup.string().required(text.CantBeEmpty),
            author: yup.string(),
            melody: yup.string(),
            text: yup.string().required(text.CantBeEmpty)
        })}/>
}

export default CreateSongForm;