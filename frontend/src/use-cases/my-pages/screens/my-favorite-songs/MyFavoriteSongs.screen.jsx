import React, { useEffect, useState } from "react";
import {
    DigitText,
    DigitLayout,
    DigitDesign,
    useDigitTranslations,
    useGammaMe
} from "@cthit/react-digit-components";
import { useSongs } from "../../../../app/Songs.context";
import SongPreview from "../../../../common/components/song-preview";
import Masonry from "../../../../common/components/masonry";
import { SONGS_ROUTE } from "../../../../app/App.routes";
import InformationCard from "../../../../common/components/information-card";
import NavMyPages from "../../components/nav-my-pages";

export const MyFavoriteSongs = () => {
    const [text, lang] = useDigitTranslations();
    const user = useGammaMe();

    const { songs, loading, tags, getFavoriteSongsFromContext } = useSongs();

    const [favSongs, setFavSongs] = useState([]);
    useEffect(() => {
        if (!loading) {
            setFavSongs(getFavoriteSongsFromContext());
        }
    }, [songs, loading, getFavoriteSongsFromContext]);

    return (
        !loading && (
            <DigitLayout.Column>
                <NavMyPages />
                {favSongs.length === 0 && (
                    <InformationCard info={text.NoFavorites} />
                )}
                {favSongs.length !== 0 && (
                    <>
                        <DigitLayout.Column
                            size={{
                                width: text.MyFavoriteSongs.length + "ch"
                            }}
                        >
                            <DigitText.Title text={text.MyFavoriteSongs} />
                            <DigitDesign.Divider
                                style={{ width: "100%", margin: "0 -20 0 0" }}
                            />
                        </DigitLayout.Column>
                        <Masonry>
                            {favSongs.map(s => (
                                <SongPreview
                                    key={s.song_id}
                                    song={s}
                                    text={text}
                                    lang={lang}
                                    tags={tags}
                                    user={user}
                                    songBaseUrl={SONGS_ROUTE + "/"}
                                />
                            ))}
                        </Masonry>
                    </>
                )}
            </DigitLayout.Column>
        )
    );
};
