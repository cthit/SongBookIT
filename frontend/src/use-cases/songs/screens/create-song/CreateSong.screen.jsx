import React from "react";
import { useGammaStatus } from "@cthit/react-digit-components";
import useAdmin from "../../../../common/hooks/use-admin";
import InsufficientAccess from "../../../../common/components/insufficient-access";
import CreateSongForm from "./components/create-song-form";
import FormatSongInstructions from "../../components/format-song-instruction";
import SongFormContainer from "../../components/song-form-container";

const CreateSong = () => {
    const [loading] = useGammaStatus();
    const admin = useAdmin();

    if (!loading && !admin) {
        return <InsufficientAccess />;
    }

    return (
        <SongFormContainer>
            <div />
            <CreateSongForm />
            <FormatSongInstructions />
        </SongFormContainer>
    );
};

export default CreateSong;
