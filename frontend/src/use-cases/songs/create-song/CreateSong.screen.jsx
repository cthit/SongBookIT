import React from "react";
import {
    DigitIconButton, useGammaStatus, DigitLayout
} from "@cthit/react-digit-components";
import {
    TopLeftPosition
} from "../../../common-ui/design/Common.styles";
import {ArrowBackRounded} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import useAdmin from "../../../common/hooks/use-admin";
import InsufficientAccess from "../../../common/views/InsufficientAccess";
import CreateSongForm from "./views/CreateSongForm.view";
import {FormatSongInstructions} from "./views/FormatSongInstructions.element";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr min-content 1fr;
  grid-gap: 1rem;
`;

const CreateSong = () => {
    let history = useHistory();
    const [loading,] = useGammaStatus()

    const admin = useAdmin();
    if (!loading && !admin) {
        return <InsufficientAccess/>;
    }

    return (
        <Container>
            <div> </div>
            <CreateSongForm/>
            <FormatSongInstructions/>
        </Container>


    )
}


export default CreateSong
