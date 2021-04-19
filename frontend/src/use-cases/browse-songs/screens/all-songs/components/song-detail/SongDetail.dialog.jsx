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

const SongDetails = ({
    admin,
    song,
    history,
    text,
    lang,
    user,
    refetchSong
}) => {
    const melody = song.melody ? song.melody : text.Unknown;
    const author = song.author ? song.author : text.Unknown;

    return {
        title: song.number + ". " + song.title,
        renderMain: () => (
            <DialogContainer>
                <DigitLayout.Row flexWrap={"wrap"}>
                    <DigitLayout.Column>
                        <DigitText.Text
                            bold
                            text={text.Author + ": " + author}
                        />
                        <Melody
                            melody_link={song.melody_link}
                            melody={text.Melody + ": " + melody}
                        />
                    </DigitLayout.Column>
                    <DigitLayout.Row
                        flex={"auto"}
                        alignItems={"center"}
                        justifyContent={"flex-end"}
                    >
                        {user && (
                            <FavoriteStarButton
                                favorite={song.favorite}
                                song_id={song.song_id}
                                refetch={refetchSong}
                            />
                        )}
                        <SongOptionsMenu song={song} />
                    </DigitLayout.Row>
                </DigitLayout.Row>
                <div style={{ marginTop: "20px" }} />
                <DigitDesign.Divider />
                <DigitLayout.Center>
                    <DigitMarkdown markdownSource={song.text} />
                </DigitLayout.Center>
            </DialogContainer>
        ),
        renderButtons: (confirm, cancel) => (
            <DigitLayout.Row flex={"1"} justifyContent={"space-between"}>
                <DigitLayout.Row>
                    {song.tags.map(tag => (
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
                        to={ADMIN_SONGS_EDIT_ROUTE + "/" + song.song_id}
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
