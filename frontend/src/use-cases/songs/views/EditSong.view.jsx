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

const FORM_NAME = "EDIT_FORM";

const EditSong = (s, callContext, deleteSong) => ({
    title: "Update song",
    renderMain: () => {
        return (
            <DigitForm
                name={FORM_NAME}
                onSubmit={(values, actions) => {
                    console.log("SUBMIT");
                    console.log(values);
                    console.log(actions);
                }}
                initialValues={{
                    title: s.title,
                    author: s.author,
                    melody: s.melody,
                    text: s.text,
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

                        <DigitButton
                            text={"Remove song"}
                            secondary
                            raised
                            onClick={() => {
                                deleteSong(s.song_id).then(() =>
                                    callContext({
                                        type: deleteSong,
                                        song_id: s.song_id,
                                    })
                                );
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
                                text={"Update song"}
                                submit
                                primary
                                raised
                                onClick={() => {}}
                            />
                        </DigitDesign.CardButtons>
                    </DigitLayout.Column>
                )}
            />
        );
    },
    renderButtons: (confirm, cancel) => (
        <>
            <DigitButton text={"Cancel"} raised onClick={cancel} />
            <DigitButton
                form={FORM_NAME}
                text={"Update song"}
                submit
                primary
                raised
                onClick={(values, actions, things) => {
                    console.log("EDIT");
                    console.log(values);
                    console.log(actions);
                    console.log(things);
                }}
            />
        </>
    ),
    onCancel: () => {},
    onConfirm: () => {},
});

export default EditSong;
