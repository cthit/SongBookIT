import React from "react";
import {
    DigitButton,
    DigitText,
    DigitMarkdown,
    DigitChip,
    DigitLayout
} from "@cthit/react-digit-components";
import {navEditSong, navHome} from "../../../../app/App.Routes";

const SongDetails = (admin, s, tags, history, text) => {
    const melody = s.melody ? s.melody : text.Unknown;
    const author = s.author ? s.author : text.Unknown;

    return {
        title: s.number + ". " + s.title,
        renderMain: () => (
            <>
                <DigitText.Text bold text={text.Author + ": " + author}/>
                <DigitText.Text text={text.Melody + ": " + melody}/>
                <DigitMarkdown markdownSource={s.text}/>
                <DigitLayout.Row>
                    {tags.map(tag => (
                        <DigitChip primary key={tag.tag_id} label={tag.name}/>
                    ))}
                </DigitLayout.Row>
            </>
        ),
        renderButtons: (confirm, cancel) => (
            <>
                {admin && (
                    <DigitButton
                        text={text.EditSong}
                        primary
                        raised
                        submit
                        onClick={confirm}
                    />
                )}
                <DigitButton text={text.Close} raised onClick={cancel}/>
            </>
        ),
        onCancel: () => navHome(history),
        onConfirm: () => navEditSong(history, s.song_id)
    };
};

export default SongDetails;
