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

const CreateSong = {
    title: "Create song",
    renderMain: () => (
        <DigitForm
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

                    {/* Hur borde jag göra här? Jag vill ha min form-submit 
                    och kunna använda den men jag vill också använda dialogens 
                    submit om den första går igenom. */}
                    <DigitDesign.CardButtons>
                        <DigitButton
                            text={"Cancel"}
                            raised
                            onClick={() => {}}
                        />
                        <DigitButton
                            text={"Save song"}
                            submit
                            primary
                            raised
                            onClick={() => {}}
                        />
                    </DigitDesign.CardButtons>
                </DigitLayout.Column>
            )}
        />
    ),
    renderButtons: (confirm, cancel) => (
        <>
            <DigitButton text={"Cancel"} raised onClick={cancel} />
            <DigitButton
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
