import React, { useState } from "react";
import { DigitLayout } from "@cthit/react-digit-components";
import CreateSongForm from "./components/create-song-form";
import FiveZeroZeroComponent from "../../../../common/components/five-zero-zero";

const CreateSong = () => {
    const [somethingWrong, setSomethingWrong] = useState(false);

    if (somethingWrong) {
        return <FiveZeroZeroComponent />;
    }

    return (
        <DigitLayout.Column centerHorizontal>
            <CreateSongForm setSomethingWrong={setSomethingWrong} />
        </DigitLayout.Column>
    );
};

export default CreateSong;
