import React from "react";
import {
    DigitAutocompleteSelectMultiple,
    DigitDesign,
    DigitLayout,
    DigitTextArea,
    DigitTextField,
    useDigitFormField
} from "@cthit/react-digit-components";

export const SongFormFields = ({text, tagOptions}) => {
    const titleField = useDigitFormField("title");
    const authorField = useDigitFormField("author");
    const melodyField = useDigitFormField("melody");
    const textField = useDigitFormField("text");
    const tagsField = useDigitFormField("tags");
    return (
        <>
            <DigitTextField size={{width: "100%"}} {...titleField} upperLabel={text.Title}/>
            <DigitTextField size={{width: "100%"}} {...authorField} upperLabel={text.Author}/>
            <DigitTextField size={{width: "100%"}} {...melodyField} upperLabel={text.Melody}/>
            <DigitTextArea size={{width: "100%"}} rowsMax={40} {...textField} upperLabel={text.Text} primary/>
            <DigitAutocompleteSelectMultiple size={{width: "100%"}}  {...tagsField} upperLabel={text.Tags}
                                             options={tagOptions}/>
        </>)
}

export const songValidationSchema = (yup, text) => (
    yup.object().shape({
        title: yup.string().required(text.CantBeEmpty),
        author: yup.string(),
        melody: yup.string(),
        text: yup.string().required(text.CantBeEmpty)
    }))

export const songInitialValues = (song = {}) => ({
    title: song.title ? song.title : "",
    author: song.author ? song.author : "",
    melody: song.melody ? song.melody : "",
    text: song.text ? song.text : "",
    tags: song.tags ? song.tags : []
})

export const SongFormCard = ({children}) => (
    <DigitDesign.Card size={{width: "min(80vw, 600px)"}}>
        <DigitDesign.CardBody>
            <DigitLayout.Column>
                {children}
            </DigitLayout.Column>
        </DigitDesign.CardBody>
    </DigitDesign.Card>)

export const tagsToTagsOptions = (tags) => (tags
    .map(tag => ({text: tag.name, value: tag.tag_id}))
    .sort((a, b) => (a.text > b.text ? 1 : -1)))