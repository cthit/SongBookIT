import React from "react";
import {
    DigitButton,
    DigitText,
    DigitForm,
    DigitFormField,
    DigitTextField,
    DigitTextArea,
    DigitLayout,
    DigitDesign,
} from "@cthit/react-digit-components";

import * as yup from "yup";

const FORM_NAME = "CREATION_FORM";

const CreateSong = {
    title: "Create song",
    renderMain: () => (
        <DigitForm
            name={FORM_NAME}
            onSubmit={(values, actions) => {
                console.log(values);
            }}
            initialValues={{
                title: "",
                author: "Unknown",
                melody: "Unknown",
                text: "",
            }}
            validationSchema={yup.object().shape({
                title: yup.string().required("This can't be empty"),
                author: yup.string().required("This can't be empty"),
                melody: yup.string().required("This can't be empty"),
                text: yup.string().required("This can't be empty"),
            })}
            render={({ errors }) => (
                <DigitLayout.Column>
                    <DigitFormField
                        name="title"
                        component={DigitTextField}
                        componentProps={{
                            upperLabel: "Title",
                        }}
                    />

                    <DigitFormField
                        name="author"
                        component={DigitTextField}
                        componentProps={{
                            upperLabel: "Author",
                        }}
                    />
                    <DigitFormField
                        name="melody"
                        component={DigitTextField}
                        componentProps={{
                            upperLabel: "Melody",
                        }}
                    />
                    <DigitFormField
                        name="text"
                        component={DigitTextArea}
                        componentProps={{
                            upperLabel: "Lyrics",
                        }}
                    />
                </DigitLayout.Column>
            )}
        />
    ),
    renderButtons: (confirm, cancel) => (
        <>
            <DigitButton text={"Cancel"} raised onClick={cancel} />
            <DigitButton
                form={FORM_NAME}
                text={"Save song"}
                submit
                primary
                raised
                onClick={confirm}
            />
        </>
    ),
    onCancel: () => {},
    onConfirm: () => {},
};

export default CreateSong;
