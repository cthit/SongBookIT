import React from "react";
import { useDispatch } from "react-redux";
import {
    DigitLayout,
    DigitFAB,
    DigitDialogActions,
    DigitDesign,
    DigitText,
    DigitMarkdown,
    DigitLoading,
    DigitIfElseRendering,
} from "@cthit/react-digit-components";
import Add from "@material-ui/icons/Add";

import { useStateValue } from "../../app/App.context";

import CreateSong from "./views/CreateSong.view";
import ViewSongDetail from "./views/ViewSongDetail.view";

const Songs = () => {
    const [{ songs, getSongs }, callContext] = useStateValue();

    // Det här känns fel, hur borde det här göras
    if (songs.length === 0) {
        getSongs().then(songs =>
            callContext({
                type: getSongs,
                songs: Object.values(songs.data.Song),
            })
        );
    }

    const dispatch = useDispatch();
    const openDialog = dialogData =>
        dispatch(DigitDialogActions.digitDialogCustomOpen(dialogData));

    return (
        <DigitLayout.Fill>
            <DigitLayout.DownRightPosition style={{ position: "fixed" }}>
                <DigitFAB
                    icon={Add}
                    secondary
                    onClick={() => openDialog(CreateSong)}
                />
            </DigitLayout.DownRightPosition>

            <DigitIfElseRendering
                test={songs.length === 0}
                ifRender={() => (
                    <DigitLayout.Column centerHorizontal>
                        <DigitLoading loading size={80} />
                    </DigitLayout.Column>
                )}
                elseRender={() => (
                    <DigitLayout.UniformGrid
                        margin="30px"
                        minItemWidth="300px"
                        justifyItems="center"
                    >
                        {songs.map(s => (
                            <DigitLayout.Margin key={s.song_id}>
                                <DigitDesign.Card
                                    minWidth="300px"
                                    maxWidth="500px"
                                    minHeight="250px"
                                    maxHeight="500px"
                                    onClick={() =>
                                        openDialog(
                                            ViewSongDetail(s, openDialog)
                                        )
                                    }
                                >
                                    <DigitDesign.CardBody
                                        style={{ cursor: "pointer" }}
                                    >
                                        <>
                                            <DigitText.Title text={s.title} />
                                            <DigitText.Text
                                                bold
                                                text={"Författare: " + s.author}
                                            />
                                            <DigitText.Text
                                                text={"Mel: " + s.melody}
                                            />
                                            <DigitMarkdown
                                                markdownSource={
                                                    s.text.slice(0, 150) + "..."
                                                }
                                            />
                                        </>
                                    </DigitDesign.CardBody>
                                </DigitDesign.Card>
                            </DigitLayout.Margin>
                        ))}
                    </DigitLayout.UniformGrid>
                )}
            />
        </DigitLayout.Fill>
    );
};

export default Songs;
