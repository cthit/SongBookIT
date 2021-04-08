import React, { useMemo } from "react";
import { useDigitTranslations } from "@cthit/react-digit-components";
import Masonry from "./masonry";
import SongPreview from "./song-preview";

export const SongMasonry = ({ songs, tags }) => {
    const [text, lang] = useDigitTranslations();

    return useMemo(
        () => (
            <Masonry>
                {songs.map(s => (
                    <SongPreview
                        key={s.song_id}
                        song={s}
                        text={text}
                        lang={lang}
                        tags={tags}
                    />
                ))}
            </Masonry>
        ),
        [text, lang, songs, tags]
    );
};
