import {
    DigitChip,
    DigitDesign,
    DigitLayout,
    DigitMarkdown,
    DigitText
} from "@cthit/react-digit-components";
import { BASE_ROUTE } from "../../../../app/App.routes";
import React, { useMemo } from "react";
import FavouriteStar from "../../../../use-cases/browse-songs/components/favourite-star";
import Melody from "../../../../use-cases/browse-songs/components/melody";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
from { opacity: 0}
to   { opacity: 1}
`;

const SongCard = styled(DigitDesign.Card)`
    animation: ${fadeIn} 0.3s;

    &:hover {
        box-shadow: 0 0 12px -5px rgba(0, 0, 0, 0.8);
    }
    &:active {
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.8);
    }
`;

const findTags = (tagIds, tags) =>
    tagIds.map(id => tags.find(tag => tag.tag_id === id));

const startOfText = text => {
    const start = text.slice(0, 100);
    const [restOfLine] = text.slice(100).split("\n", 1);
    return start.concat(restOfLine, "\n...");
};

const SongPreview = ({
    song,
    text,
    lang,
    tags,
    user,
    songUrl = BASE_ROUTE
}) => {
    const melody = song.melody ? song.melody : text.Unknown;
    const author = song.author ? song.author : text.Unknown;

    return useMemo(
        () => (
            <SongCard>
                <DigitDesign.Link to={songUrl + song.song_id}>
                    <DigitDesign.CardBody justifyContent={"space-between"}>
                        <>
                            <DigitLayout.Row justifyContent={"space-between"}>
                                <DigitText.Title
                                    text={song.number + ". " + song.title}
                                />

                                {user && (
                                    <FavouriteStar favourite={song.favourite} />
                                )}
                            </DigitLayout.Row>
                            <DigitText.Text
                                bold
                                text={text.Author + ": " + author}
                            />
                            <Melody
                                melody_link={song.melody_link}
                                melody={text.Melody + ": " + melody}
                            />
                            <DigitMarkdown
                                markdownSource={startOfText(song.text)}
                            />
                        </>

                        <DigitLayout.Row flexWrap={"wrap"}>
                            {findTags(song.tags, tags).map(tag => (
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
                    </DigitDesign.CardBody>
                </DigitDesign.Link>
            </SongCard>
        ),
        [song]
    );
};

export default SongPreview;
