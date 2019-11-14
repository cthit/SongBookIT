import React from "react";
import { useDispatch } from "react-redux";
import {
    DigitLayout,
    DigitFAB,
    DigitDialogActions,
    DigitDesign,
    DigitText,
    DigitTextField,
    DigitMarkdown,
} from "@cthit/react-digit-components";
import Add from "@material-ui/icons/Add";

import CreateSong from "./views/CreateSong.view";
import ViewSongDetail from "./views/ViewSongDetail.view";
import SearchField from "./views/SearchField.view";

const Songs = () => {
    const dispatch = useDispatch();
    const openDialog = dialogData =>
        dispatch(DigitDialogActions.digitDialogCustomOpen(dialogData));

    const data = {
        Song: {
            "6d1368ccf9784e2694ebd2c99b993f0a": {
                song_id: "6d1368ccf9784e2694ebd2c99b993f0a",
                title: "KOMPILATORN",
                melody: "Tänk om jag hade en liten apa...",
                text:
                    "Mel: Tänk om jag hade en liten apa...\n\nTänk om jag vore en liten kompilator\n\nOmpa ompa fallerallera\n\nDå skulle alla ha mig i sin dator\n\nOmpa ompa fallerallera\n\nTänk om jag vore ett Java run time error\n\nOmpa ompa fallerallera\n\nDå skulle alla lida av min terror\n\nOmpa ompa fallerallera\n\n*Text: P.R.I.T. -04*",
                author: "P.R.I.T. -04",
                tags: ["369450a045784f23be41abd2cf957a60"],
            },
            c7c1b27d57af4f23b572e13126f7277b: {
                song_id: "c7c1b27d57af4f23b572e13126f7277b",
                title: "MÅSEN",
                melody: "När månen vandrar",
                text:
                    "*Mel: När månen vandrar*\n\nDet satt en mås på en klyvarbom\n\nOch tom i krävan var kräket.\n\nOch tungan lådde vid skepparns gom\n\nDär han satt uti bleket.\n\nJag vill ha sill hördes måsen rope'\n\nOch skepparn svarte: jag vill ha OP\n\nOm blott jag får, om blott jag får.\n\nNu lyfter måsen från klyvarbom\n\nOch vinden spelar i tågen\n\nOP'n svalkat har skepparns gom,\n\nJag önskar blott att jag såg 'en.\n\nSå nöjd och lycklig den arme saten\n\nHan sätter storseglet den krabaten,\n\nTill sjöss han far, och halvan tar!\n\nNär månen vandrar sin tysta ban\n\nOch tittar in i kajutan\n\nDå tänker jag att på ljusan dan\n\nDå kan jag klara mig utan\n\nJa jag kan klara mig utan månen\n\nMen utan OP'n och utan Skåne'n\n\nDet vete fan, det vete fan.",
                author: "Unknown",
                tags: ["64beffd088684b5fad97c97a972ae81a"],
            },
            dc32af2c239a48b3a6e1e032cb880c2f: {
                song_id: "dc32af2c239a48b3a6e1e032cb880c2f",
                title: "VI ÄRO FRÅN IT",
                melody: "Vi äro små humlor vi...",
                text:
                    "*Mel: Vi äro små humlor vi...*\n\n//:Vi äro från IT vi://\n\nVi gillar turkost och vi vördar ju Smurfen\n\nVi äro från IT vi.\n\n*Text: P.R.I.T. -04*",
                author: "P.R.I.T. -04",
                tags: ["369450a045784f23be41abd2cf957a60"],
            },

            "0202888bdb08449286c08b4732c11382": {
                song_id: "0202888bdb08449286c08b4732c11382",
                title: "NÄR NUBBEN KOM TILL",
                melody: "När Lillan kom till jorden",
                text:
                    "*Mel: När Lillan kom till jorden*\n\nAtt nubben kom till jorden\n\nDet skötte gubben Noak om\n\nOch snart till kalla norden\n\nDen ädla drycken kom\n\nOch därför säger mamma\n\nSå är jag nästan alltid glad\n\nTy nubben den gör livet\n\nTill ständig solskensdag",
                author: "Unknown",
                tags: ["64beffd088684b5fad97c97a972ae81a"],
            },
            "7e19790c1751432d980c9f9d74e635a4": {
                song_id: "7e19790c1751432d980c9f9d74e635a4",
                title: "IT: s PUB",
                melody: "Pippi Långstrump",
                text:
                    "*Mel: Pippi Långstrump*\n\nVill du ut och festa\n\nOch sen nya saker testa\n\nVill du ha det roligt\n\nKom till IT: s pub ida'!\n\nJa, till IT ska vi sticka\n\nFör där finns mat, musik och dricka\n\nHär samlas det bästa folket\n\nJa, precis som det ska va'!\n\nKom nu allihopa\n\nNu ska vi glada sånger ropa\n\nDansa, flirta, sjunga\n\nVart annars vill man va'?\n\nJa, till IT ska vi sticka...\n\n*Text: P.R.I.T. -04*",
                author: "P.R.I.T. -04",
                tags: ["369450a045784f23be41abd2cf957a60"],
            },
            "71df4b68944a4acc901a09b314b4f2a8": {
                song_id: "71df4b68944a4acc901a09b314b4f2a8",
                title: "MINNE",
                melody: "Memory",
                text:
                    "*Mel: Memory*\n\nMinne, jag har tappat mitt minne.\n\nÄr jag svensk eller finne?\n\nKommer inte ihåg.\n\nInne, är jag ut' eller inne?\n\nJag har luckor i minne'\n\nSån' där små alkohol\n\nMen besinn' er\n\nMan tätar med brännvin man får\n\nFastän minne' och helan går",
                author: "Unknown",
                tags: ["64beffd088684b5fad97c97a972ae81a"],
            },
            "36d434dd48bb4e8f8f579b3043f26e8f": {
                song_id: "36d434dd48bb4e8f8f579b3043f26e8f",
                title: "TOMT I ALLA GLAS",
                melody: "Nu är det jul i alla hus...",
                text:
                    "*Mel: Nu är det jul i alla hus...*\n\nNu är det tomt i alla glas\n\nekot i dem klinga\n\nDrickan är sen länge slut\n\nkom, mer till oss bringa!\n\nVi vill ha snaps, vi vill ha snaps,\n\nja, vi vill ha snaps!\n\n*(Snaps kan bytas ut mot godtycklig dryck efter eget önskemål)*\n\n*Text: P.R.I.T. -04*",
                author: "P.R.I.T. -04",
                tags: ["369450a045784f23be41abd2cf957a60"],
            },
            c7bccac4288c47708dfef285ff24a928: {
                song_id: "c7bccac4288c47708dfef285ff24a928",
                title: "HELAN GÅR",
                melody: "",
                text:
                    "Helan går, sjung hopp faderallanlallanlej!\n\nHelan går, sjung hopp faderallanlallanlej!\n\nOch den som inte helan tar\n\nHan heller inte halvan får.\n\nHelan går!\n\nSjung hopp faderallanlallanlej!",
                author: "Unknown",
                tags: ["64beffd088684b5fad97c97a972ae81a"],
            },
        },
    };
    const songs = Object.values(data.Song);

    return (
        <DigitLayout.Fill>
            <DigitLayout.DownRightPosition style={{ position: "fixed" }}>
                <DigitFAB
                    icon={Add}
                    secondary
                    onClick={() => openDialog(CreateSong)}
                />
            </DigitLayout.DownRightPosition>

            <DigitLayout.UniformGrid
                margin="30px"
                minItemWidth="300px"
                justifyItems="center"
            >
                {songs.map(s => (
                    <DigitLayout.Fill padding="20px" key={s.song_id}>
                        <DigitDesign.Card
                            minWidth="300px"
                            maxWidth="800px"
                            minHeight="250px"
                            maxHeight="500px"
                            onClick={() =>
                                openDialog(ViewSongDetail(s, openDialog))
                            }
                        >
                            <DigitDesign.CardBody style={{ cursor: "pointer" }}>
                                <>
                                    <DigitText.Title text={s.title} />
                                    <DigitText.Text
                                        bold
                                        text={"Författare: " + s.author}
                                    />
                                    <DigitText.Text text={"Mel: " + s.melody} />
                                    <DigitMarkdown
                                        markdownSource={
                                            s.text.slice(0, 150) + "..."
                                        }
                                    />
                                </>
                            </DigitDesign.CardBody>
                        </DigitDesign.Card>
                    </DigitLayout.Fill>
                ))}
            </DigitLayout.UniformGrid>
        </DigitLayout.Fill>
    );
};

export default Songs;
