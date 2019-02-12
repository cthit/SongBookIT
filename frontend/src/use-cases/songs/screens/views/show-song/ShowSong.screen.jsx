import React from "react";
import {
    DigitLayout,
    DigitDesign,
    DigitDisplayData
} from "@cthit/react-digit-components";

const mockSong = {
    name: "teckenvisan",
    lyrics: ".,.,/*_\"#-^'{}",
    melody: "pepparkakas låten",
    author: "????",
    category: "IT"
};

const ShowSong = song => (
    <DigitLayout.Fill>
        <DigitDesign.Card minWidth="300px" maxWidth="800px">
            <DigitDesign.CardBody>
                <DigitDisplayData
                    data={song}
                    keysOrder={[
                        "name",
                        "lyrics",
                        "melody",
                        "author",
                        "category"
                    ]}
                    keysText={{
                        name: "Namn på låten",
                        lyrics: "text som sjungs",
                        melody: "melodi för låten",
                        author: "vem som skrev låten",
                        category: "med vilka låter denna klumpas"
                    }}
                />
            </DigitDesign.CardBody>
        </DigitDesign.Card>
    </DigitLayout.Fill>
);

export default ShowSong;
