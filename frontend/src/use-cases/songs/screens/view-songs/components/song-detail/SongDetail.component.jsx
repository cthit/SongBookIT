import React from "react";
import {
    DigitButton,
    DigitChip,
    DigitDesign,
    DigitLayout,
    DigitMarkdown,
    DigitText
} from "@cthit/react-digit-components";
import { navEditSong, navHome } from "../../../../../../app/App.routes";
import styled from "styled-components";

export const SongContainer = styled.div`
    width: min(
        100vw - (2 * 24px) - (2 * 32px),
        600px - (2 * 24px)
    ); // Digit dialog has a max width of 600 px and 28px padding inside
`;

const SongDetails = (admin, s, tags, history, text) => {
    const melody = s.melody ? s.melody : text.Unknown;
    const author = s.author ? s.author : text.Unknown;

    return {
        title: s.number + ". " + s.title,
        renderMain: () => (
            <SongContainer>
                <DigitLayout.Row
                    flexWrap={"wrap"}
                    justifyContent={"space-between"}
                >
                    <div>
                        <DigitText.Text
                            bold
                            text={text.Author + ": " + author}
                        />
                        <DigitText.Text text={text.Melody + ": " + melody} />
                    </div>
                    <DigitLayout.Row>
                        {tags.map(tag => (
                            <DigitChip
                                primary
                                key={tag.tag_id}
                                label={tag.name}
                            />
                        ))}
                    </DigitLayout.Row>
                </DigitLayout.Row>
                <div style={{ marginTop: "20px" }} />
                <DigitDesign.Divider />
                <DigitLayout.Center>
                    <DigitMarkdown markdownSource={s.text} />
                </DigitLayout.Center>
            </SongContainer>
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
                <DigitButton text={text.Close} raised onClick={cancel} />
            </>
        ),
        onCancel: () => navHome(history),
        onConfirm: () => navEditSong(history, s.song_id)
    };
};

export default SongDetails;
