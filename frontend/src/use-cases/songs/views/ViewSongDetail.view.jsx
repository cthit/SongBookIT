import React from "react";
import {
    DigitButton,
    DigitText,
    DigitMarkdown,
    DigitChip,
    DigitLayout,
} from "@cthit/react-digit-components";

const SongDetails = (s, tags, history) => {
    const melody = s.melody ? s.melody : "Unknown"
    const author = s.author ? s.author : "Unknown"
    return {
        title: s.number + ". " + s.title,
        renderMain: () => (
            <>
                <DigitText.Text bold text={"Text: " + author} />
                <DigitText.Text text={"Mel: " + melody} />
                <DigitMarkdown markdownSource={s.text} />
                <DigitLayout.Row>
                    {tags.map(tag => (
                        <DigitChip
                            primary
                            key={tag.tag_id}
                            label={tag.name} />
                    ))}
                </DigitLayout.Row>
            </>
        ),
        renderButtons: (confirm, cancel) => (
            <>
                <DigitButton
                    text={"Close song"}
                    raised
                    onClick={cancel} />
                <DigitButton
                    text={"Edit song"}
                    primary
                    raised
                    submit
                    onClick={confirm}
                />
            </>
        ),
        onCancel: () => history.push("/songs"),
        onConfirm: () => history.push("/songs/edit/" + s.song_id)
    };
};

export default SongDetails;
