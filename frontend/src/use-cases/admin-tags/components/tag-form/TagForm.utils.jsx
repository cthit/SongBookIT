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

export const TagFormFields = () => {
    const [text] = useDigitTranslations();
    const nameField = useDigitFormField("name");
    const nameSVField = useDigitFormField("pretty_name_sv");
    const nameENField = useDigitFormField("pretty_name_en");
    return (
        <>
            <DigitTextField
                size={{ width: "100%" }}
                {...nameField}
                upperLabel={text.TagName}
            />
            <DigitTextField
                size={{ width: "100%" }}
                {...nameSVField}
                upperLabel={text.TagNameSV}
            />
            <DigitTextField
                size={{ width: "100%" }}
                {...nameENField}
                upperLabel={text.TagNameEN}
            />
        </>
    );
};

export const tagValidationSchema = (yup, text) =>
    yup.object().shape({
        name: yup.string().required(text.CantBeEmpty),
        pretty_name_sv: yup.string().required(text.CantBeEmpty),
        pretty_name_en: yup.string().required(text.CantBeEmpty)
    });

export const tagInitialValues = (tag = {}) => ({
    name: tag.name ? tag.name : "",
    pretty_name_sv: tag.pretty_name_sv ? tag.pretty_name_sv : "",
    pretty_name_en: tag.pretty_name_en ? tag.pretty_name_en : ""
});

export const TagFormCard = ({ children }) => (
    <DigitDesign.Card size={{ width: "min(80vw, 600px)" }}>
        <DigitDesign.CardBody>
            <DigitLayout.Column>{children}</DigitLayout.Column>
        </DigitDesign.CardBody>
    </DigitDesign.Card>
);
