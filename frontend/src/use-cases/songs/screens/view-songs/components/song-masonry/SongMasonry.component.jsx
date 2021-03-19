import { useHistory } from "react-router-dom";
import React, { useMemo } from "react";
import { useDigitTranslations } from "@cthit/react-digit-components";
import Masonry from "./masonry";
import SongPreview from "./song-preview";

export const SongMasonry = ({ songs, tags }) => {
    const [text] = useDigitTranslations();
    let history = useHistory();

    return useMemo(
        () => (
            <Masonry>
                {songs.map(s => (
                    <SongPreview
                        key={s.song_id}
                        song={s}
                        history={history}
                        text={text}
                        tags={tags}
                    />
                ))}
            </Masonry>
        ),
        [JSON.stringify(songs), text]
    );
};
