import React from "react";
import {
    DigitButton,
    DigitText,
    DigitMarkdown,
} from "@cthit/react-digit-components";

const ViewSongDetails = s => {
    return {
        title: s.title,
        renderMain: () => (
            <>
                <DigitText.Text bold text={"Text: " + s.author} />
                <DigitText.Text text={"Mel: " + s.melody} />
                <DigitMarkdown markdownSource={s.text} />
            </>
        ),
        renderButtons: (confirm, cancel) => (
            <>
                <DigitButton text={"Close song"} raised onClick={cancel} />
                <DigitButton
                    text={"Edit song"}
                    primary
                    raised
                    submit
                    onClick={confirm}
                />
            </>
        ),
        onCancel: () => {},
        onConfirm: () => console.log("heh, good prank"),
    };
};

export default ViewSongDetails;
