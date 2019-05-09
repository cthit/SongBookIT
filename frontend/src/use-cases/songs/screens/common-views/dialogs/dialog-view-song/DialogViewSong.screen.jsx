import Dialog from "@material-ui/core/Dialog";
import ShowSong from "../../show-song";
import { DigitButton, DigitDesign } from "@cthit/react-digit-components";

import React from "react";

export const DialogViewSong = ({ open, handleClose, song }) => (
    <Dialog open={open} onClose={handleClose}>
        <ShowSong {...song} />
        <DigitDesign.CardButtons>
            <DigitButton onClick={handleClose} primary text="Close" />
        </DigitDesign.CardButtons>
    </Dialog>
);
