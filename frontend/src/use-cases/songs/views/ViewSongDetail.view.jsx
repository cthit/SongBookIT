import React from "react";
import {
    DigitButton,
    DigitText,
    DigitMarkdown,
} from "@cthit/react-digit-components";

import EditSong from "./EditSong.view";

const ViewSongDetails = (s, openDialog) => {
    return {
        title: s.title,
        renderMain: () => (
            <>
                <DigitText.Text bold text={"Författare: " + s.author} />
                <DigitText.Text text={"Mel: " + s.melody} />
                <DigitMarkdown markdownSource={s.text} />
            </>
        ),
        renderButtons: (confirm, cancel) => (
            <>
                <DigitButton
                    text={"Close"}
                    secondary
                    outlined
                    onClick={cancel}
                />
                {/* <DigitButton
                    text={"Edit song"}
                    primary
                    outlined
                    submit
                    onClick={confirm}
                /> */}
            </>
        ),
        onCancel: () => {},
        onConfirm: () => openDialog(EditSong(s)),
    };
};

export default ViewSongDetails;
