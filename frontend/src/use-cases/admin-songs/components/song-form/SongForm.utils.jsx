import React from "react";
import {
    DigitAutocompleteSelectMultiple,
    DigitButton,
    DigitDesign,
    DigitLayout,
    DigitMarkdown,
    DigitTextArea,
    DigitTextField,
    useDigitCustomDialog,
    useDigitFormField,
    useDigitTranslations
} from "@cthit/react-digit-components";
import SongDetailContainer from "../../../../common/components/song-detail-container";

const definePreviewDialog = (songText, text) => ({
    renderMain: () => (
        <SongDetailContainer>
            <DigitLayout.Column>
                <DigitMarkdown markdownSource={text.FormatSong} />
                <DigitDesign.Divider />
                <DigitMarkdown markdownSource={songText} />
            </DigitLayout.Column>
        </SongDetailContainer>
    ),
    renderButtons: (confirm, cancel) => (
        <DigitButton text={text.Close} raised onClick={confirm} />
    )
});

export const SongFormFields = ({ tags }) => {
    const [text, lang] = useDigitTranslations();
    const [openDialog] = useDigitCustomDialog();
    const titleField = useDigitFormField("title");
    const authorField = useDigitFormField("author");
    const melodyField = useDigitFormField("melody");
    const melodyLinkField = useDigitFormField("melody_link");
    const textField = useDigitFormField("text");
    const tagsField = useDigitFormField("tags");
    return (
        <>
            <DigitTextField
                size={{ width: "100%" }}
                {...titleField}
                upperLabel={text.Title}
            />
            <DigitTextField
                size={{ width: "100%" }}
                {...authorField}
                upperLabel={text.Author}
            />
            <DigitTextField
                size={{ width: "100%" }}
                {...melodyField}
                upperLabel={text.Melody}
            />
            <DigitTextField
                size={{ width: "100%" }}
                {...melodyLinkField}
                upperLabel={text.MelodyLink}
            />
            <DigitTextArea
                size={{ width: "100%" }}
                rowsMax={13}
                {...textField}
                upperLabel={text.Text}
                primary
            />

            <DigitLayout.Column alignItems={"flex-start"}>
                <DigitMarkdown markdownSource={text.MarkdownFormatSong} />
                <DigitButton
                    primary
                    text={text.PreviewText}
                    onClick={() =>
                        openDialog(definePreviewDialog(textField.value, text))
                    }
                />
            </DigitLayout.Column>
            <DigitAutocompleteSelectMultiple
                size={{ width: "100%" }}
                {...tagsField}
                upperLabel={text.Tags}
                options={tagsToTagsOptions(tags, lang)}
            />
        </>
    );
};

export const songValidationSchema = (yup, text) =>
    yup.object().shape({
        title: yup.string().required(text.CantBeEmpty),
        author: yup.string(),
        melody: yup.string(),
        melody_link: yup
            .string()
            .url()
            .matches(/(https:\/\/.?)*/i, {
                message: "Must be a valid URL starting with https://"
            }),
        text: yup.string().required(text.CantBeEmpty)
    });

export const songInitialValues = (song = {}) => ({
    title: song.title ? song.title : "",
    author: song.author ? song.author : "",
    melody: song.melody ? song.melody : "",
    melody_link: song.melody_link ? song.melody_link : "",
    text: song.text ? song.text : "",
    tags: song.tags ? song.tags : []
});

const tagsToTagsOptions = (tags, lang) =>
    tags
        .map(tag => ({
            text: lang === "en" ? tag.pretty_name_en : tag.pretty_name_sv,
            value: tag.tag_id
        }))
        .sort((a, b) => (a.text > b.text ? 1 : -1));
