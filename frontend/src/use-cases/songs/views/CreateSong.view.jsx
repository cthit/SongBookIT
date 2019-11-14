import React from "react";
import { DigitButton, DigitText } from "@cthit/react-digit-components";

const CreateSong = {
    title: "sssssssssssssss",
    renderMain: () => <DigitText.Text text={"Hejsan eller inte"} />,
    renderButtons: (confirm, cancel) => (
        <>
            <DigitButton text={"Cancel"} secondary outlined onClick={cancel} />
            <DigitButton
                text={"Save song"}
                submit
                primary
                outlined
                onClick={confirm}
            />
        </>
    ),
    onCancel: () => {},
    onConfirm: () => {},
};

export default CreateSong;
