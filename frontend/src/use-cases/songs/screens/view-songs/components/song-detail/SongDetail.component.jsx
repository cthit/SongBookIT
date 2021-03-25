import React from "react";
import {
    DigitButton,
    DigitChip,
    DigitDesign,
    DigitLayout,
    DigitMarkdown,
    DigitText
} from "@cthit/react-digit-components";
import { BASE_ROUTE, SONGS_EDIT_ROUTE } from "../../../../../../app/App.routes";
import SongDetailContainer from "../../../../components/song-detail-container";

const SongDetails = (admin, s, history, text) => {
    const melody = s.melody ? s.melody : text.Unknown;
    const author = s.author ? s.author : text.Unknown;

    return {
        title: s.number + ". " + s.title,
        renderMain: () => (
            <SongDetailContainer>
                <DigitLayout.Row
                    flexWrap={"wrap"}
                    justifyContent={"space-between"}
                >
                    <DigitLayout.Column>
                        <DigitText.Text
                            bold
                            text={text.Author + ": " + author}
                        />
                        <DigitText.Text text={text.Melody + ": " + melody} />
                    </DigitLayout.Column>
                    <DigitLayout.Row>
                        {s.tags.map(tag => (
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
            </SongDetailContainer>
        ),
        renderButtons: (confirm, cancel) => (
            <>
                {admin && (
                    <DigitDesign.Link to={SONGS_EDIT_ROUTE + s.song_id}>
                        <DigitButton
                            text={text.EditSong}
                            primary
                            raised
                            submit
                            onClick={confirm}
                        />
                    </DigitDesign.Link>
                )}
                <DigitDesign.Link to={BASE_ROUTE}>
                    <DigitButton text={text.Close} raised onClick={cancel} />
                </DigitDesign.Link>
            </>
        )
    };
};

export default SongDetails;
