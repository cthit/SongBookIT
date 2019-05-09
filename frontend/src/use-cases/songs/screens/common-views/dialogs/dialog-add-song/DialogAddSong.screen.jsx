import Dialog from "@material-ui/core/Dialog";
import {
    DigitTextArea,
    DigitText,
    DigitTextField,
    DigitButton,
    DigitFormField,
    DigitDesign,
    DigitForm
} from "@cthit/react-digit-components";
import * as yup from "yup";

import React from "react";

export const DialogAddSong = ({ open, handleClose }) => (
    <Dialog open={open} onClose={handleClose}>
        <DigitForm
            validationSchema={yup.object().shape({
                title: yup.string().required("This can't be empty"),
                melody: yup.string().required("This can't be empty"),
                author: yup.string(),
                text: yup.string().required("This can't be empty")
            })}
            render={() => (
                <DigitDesign.Card absWidth="500px" absHeight="700px">
                    <DigitDesign.CardBody>
                        <DigitText.Title text="Create a song" />

                        <DigitFormField
                            name="title"
                            component={DigitTextField}
                            componentProps={{
                                upperLabel: "Title"
                            }}
                        />
                        <DigitFormField
                            name="melody"
                            component={DigitTextField}
                            componentProps={{
                                upperLabel: "Melody"
                            }}
                        />
                        <DigitFormField
                            name="author"
                            component={DigitTextField}
                            componentProps={{
                                upperLabel: "Author"
                            }}
                        />
                        <DigitFormField
                            name="text"
                            component={DigitTextArea}
                            componentProps={{
                                upperLabel: "Text"
                            }}
                        />
                    </DigitDesign.CardBody>
                    <DigitDesign.CardButtons>
                        <DigitButton
                            onClick={handleClose}
                            primary
                            raised
                            text="Create song"
                        />
                    </DigitDesign.CardButtons>
                </DigitDesign.Card>
            )}
        />
    </Dialog>
);
