import React, { useState } from "react";
import { useGammaStatus, DigitLayout } from "@cthit/react-digit-components";
import useAdmin from "../../../../common/hooks/use-admin";
import InsufficientAccess from "../../../../common/components/insufficient-access";
import CreateSongForm from "./components/create-song-form";
import FiveZeroZeroComponent from "../../../../common/components/five-zero-zero";

const CreateSong = () => {
    const [loading] = useGammaStatus();
    const admin = useAdmin();
    const [somethingWrong, setSomethingWrong] = useState(false);

    if (!loading && !admin) {
        return <InsufficientAccess />;
    }

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
