import React, { useCallback } from "react";
import {
    DigitMenu,
    useDigitToast,
    useDigitTranslations
} from "@cthit/react-digit-components";
import { SONGS_ROUTE } from "../../../../app/App.routes";

const copyToClipboard = async (text, queueToast, niceMessage, badMessage) => {
    try {
        await navigator.clipboard.writeText(text);
        queueToast({ text: niceMessage });
    } catch (err) {
        queueToast({ text: badMessage });
    }
};

const handleCopySongToClipboard = (song, queueToast, text, lang) => {
    const tagNames = song.tags
        .map(tag => (lang === "en" ? tag.pretty_name_en : tag.pretty_name_sv))
        .join(", ");

    const songContentToString = `Nr. ${song.number}: ${song.title}
${text.Tags}: ${tagNames}
${text.Author}: ${song.author}
${text.Melody}: ${song.melody}
${text.MelodyLink}: ${song.melody_link}

${song.text}`;

    console.log(songContentToString);

    copyToClipboard(
        songContentToString,
        queueToast,
        text.CopySongSuccessful,
        text.CopySongFailed
    );
};

const handlePermalinkToClipboard = (song, queueToast, text) => {
    const link = `${window.ENV.REACT_APP_FRONTEND_URL}${SONGS_ROUTE}/${song.song_id}`;

    copyToClipboard(
        link,
        queueToast,
        text.PermalinkSongSuccessful,
        text.PermalinkSongFailed
    );
};

export const SongOptionsMenu = ({ song }) => {
    const [queueToast] = useDigitToast();
    const [text, lang] = useDigitTranslations();

    const handleOnCLick = useCallback(
        r => {
            if (r === "copy") {
                handleCopySongToClipboard(song, queueToast, text, lang);
            } else if (r === "permalink") {
                handlePermalinkToClipboard(song, queueToast, text);
            }
        },
        [song, text, lang, queueToast]
    );

    return (
        <DigitMenu
            margin={{ left: "-15px", right: "-10px" }}
            valueToTextMap={{
                copy: text.CopySong,
                permalink: text.PermalinkSong
            }}
            order={["copy", "permalink"]}
            onClick={handleOnCLick}
        />
    );
};
