import {DigitChip, DigitDesign, DigitMarkdown, DigitText} from "@cthit/react-digit-components";
import {navViewSong} from "../../../../../app/App.Routes";
import {SongCardBody, TagList} from "../../Songs.styles";
import React from "react";


const findTags = (tagIds, tags) => {
    return tagIds.map(id => tags.find(tag => tag.tag_id === id));
};

const startOfText = (text) => {
    const start = text.slice(0,100)
    const [restOfLine, ] = text.slice(100).split("\n", 1)
    return start.concat(restOfLine, "\n\n...")
}

const SongPreview = ({song, history, text, tags}) => {
    const melody = song.melody ? song.melody : text.Unknown;
    const author = song.author ? song.author : text.Unknown;

    return (
        <DigitDesign.Card
            style={{cursor: "pointer"}}
            onClick={() => navViewSong(history, song.song_id)}
        >
            <SongCardBody>
                <DigitText.Title text={song.number + ". " + song.title}/>
                <DigitText.Text
                    bold
                    text={text.Author + ": " + author}
                />
                <DigitText.Text text={"Mel: " + melody}/>
                <DigitMarkdown
                    markdownSource={startOfText(song.text)}
                />
                <TagList>
                    {findTags(song.tags, tags).map(tag => (
                        <DigitChip
                            primary
                            key={tag.tag_id}
                            label={tag.name}
                        />
                    ))}
                </TagList>
            </SongCardBody>
        </DigitDesign.Card>
    )
}

export  default SongPreview;