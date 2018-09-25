import React from "react";
import { DigitButton, DigitText } from "@cthit/react-digit-components";

const EditSong = s => ({
    title: s.title,
    renderMain: () => (
        <>
            <DigitText.Text bold text={"Författare: " + s.author} />
            <DigitText.Text text={"Mel: " + s.melody} />
        </>
    ),
    renderButtons: (confirm, cancel) => (
        <>
            <DigitButton text={"Cancel"} secondary outlined onClick={cancel} />
            <DigitButton
                text={"Save edit"}
                submit
                primary
                outlined
                onClick={confirm}
            />
        </>
    ),
    onCancel: () => {},
    onConfirm: () => {},
});

export default EditSong;
