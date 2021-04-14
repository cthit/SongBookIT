import React, { useEffect, useState } from "react";
import {
    DigitLayout,
    useDigitTranslations,
    useGammaMe,
    DigitText
} from "@cthit/react-digit-components";
import { useSongs } from "../../../../app/Songs.context";
import SongPreview from "../../../../common/components/song-masonry/song-preview";
import Masonry from "../../../../common/components/song-masonry/masonry";
import NoFavorites from "./components/no-favorites/";
import { SONGS_ROUTE } from "../../../../app/App.routes";

export const MeScreen = () => {
    const [text, lang] = useDigitTranslations();
    const user = useGammaMe();

    const { songs, loading, tags, getFavouriteSongsFromContext } = useSongs();

    const [favSongs, setFavSongs] = useState([]);
    useEffect(() => {
        if (!loading) {
            setFavSongs(getFavouriteSongsFromContext());
        }
    }, [songs, loading, getFavouriteSongsFromContext]);

    return (
        <DigitLayout.Column>
            <DigitLayout.Row justifyContent={"center"}>
                <DigitText.Title text={text.MyFavorites} />
            </DigitLayout.Row>
            {favSongs.length === 0 && <NoFavorites />}
            {favSongs.length !== 0 && (
                <Masonry>
                    {favSongs.map(s => (
                        <SongPreview
                            key={s.song_id}
                            song={s}
                            text={text}
                            lang={lang}
                            tags={tags}
                            user={user}
                            songUrl={SONGS_ROUTE + "/"}
                        />
                    ))}
                </Masonry>
            )}
        </DigitLayout.Column>
    );
};
