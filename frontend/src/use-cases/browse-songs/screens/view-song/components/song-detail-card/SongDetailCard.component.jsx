import {
    DigitButton,
    DigitChip,
    DigitDesign,
    DigitIconButton,
    DigitLayout,
    DigitMarkdown,
    DigitText,
    useDigitTranslations,
    useGammaMe
} from "@cthit/react-digit-components";
import { ArrowBack } from "@material-ui/icons";
import FavoriteStarButton from "../../../../components/favorite-star-button";
import { ADMIN_SONGS_EDIT_ROUTE } from "../../../../../../app/App.routes";
import MainFormCard from "../../../../../../common/components/main-form-card";
import React from "react";
import useAdmin from "../../../../../../common/hooks/use-admin";
import Melody from "../../../../components/melody";
import { useHistory } from "react-router-dom";
import ThinDivider from "../../../../../../common/components/thin-divider";
import SongOptionsMenu from "../../../../components/song-options-menu";

export const SongDetailCard = ({ song, refetchSong }) => {
    const [text, lang] = useDigitTranslations();
    const user = useGammaMe();
    const admin = useAdmin();
    const history = useHistory();

    const melody = song.melody ? song.melody : text.Unknown;
    const author = song.author ? song.author : text.Unknown;

    return (
        <MainFormCard>
            <DigitLayout.Row justifyContent={"space-between"}>
                <DigitLayout.Row alignItems={"center"}>
                    <DigitIconButton
                        icon={ArrowBack}
                        onClick={() => history.goBack()}
                        size={{ width: "48px", height: "48px" }}
                    />
                    <DigitText.Text
                        bold
                        text={song.number + ". " + song.title}
                    />
                </DigitLayout.Row>
                <DigitLayout.Row alignItems={"center"}>
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
            <DigitText.Text bold text={text.Author + ": " + author} />
            <Melody
                melody_link={song.melody_link}
                melody={text.Melody + ": " + melody}
            />
            <ThinDivider />
            <DigitLayout.Center>
                <DigitMarkdown markdownSource={song.text} />
            </DigitLayout.Center>
            <DigitLayout.Row justifyContent={"space-between"}>
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
                        <DigitButton text={text.EditSong} primary raised />
                    </DigitDesign.Link>
                )}
            </DigitLayout.Row>
        </MainFormCard>
    );
};
