import React from "react";
import {
    DigitButton,
    DigitText,
    DigitMarkdown,
    DigitChip,
    DigitLayout,
} from "@cthit/react-digit-components";


const SongDetails = (s, tags, history) => {
    return {
        title: s.title,
        renderMain: () => (
            <>
                <DigitText.Text bold text={"Text: " + s.author} />
                <DigitText.Text text={"Mel: " + s.melody} />
                <DigitMarkdown markdownSource={s.text} />
                <DigitLayout.Row>
                    {findTags(s.tags, tags).map(tag => (
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
        onConfirm: () => history.push("/edit/" + s.song_id)
    };
};

const findTags = (tagIds, tags) => {
    return tagIds.map(id => tags.find(tag => tag.tag_id === id));
};

export default SongDetails;
