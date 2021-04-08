import React from "react";
import {
    DigitButton,
    DigitChip,
    DigitDesign,
    DigitLayout,
    DigitMarkdown,
    DigitText
} from "@cthit/react-digit-components";
import {
    BASE_ROUTE,
    ADMIN_SONGS_EDIT_ROUTE
} from "../../../../../../app/App.routes";
import { DialogContainer } from "../../../../../../common/components/song-detail-container/DialogContainer.component";

const Melody = ({ melody, melody_link }) => {
    const MelodyText = <DigitText.Text text={melody} />;
    if (melody_link) {
        return <a href={melody_link}>{MelodyText}</a>;
    } else {
        return MelodyText;
    }
};

const SongDetails = (admin, s, history, text, lang) => {
    const melody = s.melody ? s.melody : text.Unknown;
    const author = s.author ? s.author : text.Unknown;

    return {
        title: s.number + ". " + s.title,
        renderMain: () => (
            <DialogContainer>
                <DigitLayout.Row
                    flexWrap={"wrap"}
                    justifyContent={"space-between"}
                >
                    <DigitLayout.Column>
                        <DigitText.Text
                            bold
                            text={text.Author + ": " + author}
                        />
                        <Melody
                            melody_link={s.melody_link}
                            melody={text.Melody + ": " + melody}
                        />
                    </DigitLayout.Column>
                    <DigitLayout.Row>
                        {s.tags.map(tag => (
                            <DigitChip
                                primary
                                key={tag.tag_id}
                                label={
                                    lang === "en"
                                        ? tag.pretty_name_en
                                        : tag.pretty_name_sv
                                }
                            />
                        ))}
                    </DigitLayout.Row>
                </DigitLayout.Row>
                <div style={{ marginTop: "20px" }} />
                <DigitDesign.Divider />
                <DigitLayout.Center>
                    <DigitMarkdown markdownSource={s.text} />
                </DigitLayout.Center>
            </DialogContainer>
        ),
        renderButtons: (confirm, cancel) => (
            <>
                {admin && (
                    <DigitDesign.Link
                        to={ADMIN_SONGS_EDIT_ROUTE + "/" + s.song_id}
                    >
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
