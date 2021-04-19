import React from "react";
import {
    DigitButton,
    DigitChip,
    DigitDesign,
    DigitLayout,
    DigitMarkdown,
    DigitText
} from "@cthit/react-digit-components";
import { ADMIN_SONGS_EDIT_ROUTE } from "../../../../../../app/App.routes";
import DialogContainer from "../../../../../../common/components/song-detail-container";
import FavoriteStarButton from "../../../../components/favorite-star-button";
import SongOptionsMenu from "../../../../components/song-options-menu";
import Melody from "../../../../components/melody";
import styled from "styled-components";

const MenuRow = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const SongDetails = (admin, s, history, text, lang, user, refetchSong) => {
    const melody = s.melody ? s.melody : text.Unknown;
    const author = s.author ? s.author : text.Unknown;

    return {
        title: s.number + ". " + s.title,
        renderMain: () => (
            <DialogContainer>
                <MenuRow>
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
                    <DigitLayout.Row
                        flex={1}
                        alignItems={"center"}
                        justifyContent={"flex-end"}
                    >
                        {user && (
                            <FavoriteStarButton
                                favorite={s.favorite}
                                song_id={s.song_id}
                                refetch={refetchSong}
                            />
                        )}
                        <SongOptionsMenu song={s} />
                    </DigitLayout.Row>
                </MenuRow>
                <div style={{ marginTop: "20px" }} />
                <DigitDesign.Divider />
                <DigitLayout.Center>
                    <DigitMarkdown markdownSource={s.text} />
                </DigitLayout.Center>
            </DialogContainer>
        ),
        renderButtons: (confirm, cancel) => (
            <DigitLayout.Row flex={"1"} justifyContent={"space-between"}>
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
            </DigitLayout.Row>
        ),
        onCancel: () => history.goBack()
    };
};

export default SongDetails;
