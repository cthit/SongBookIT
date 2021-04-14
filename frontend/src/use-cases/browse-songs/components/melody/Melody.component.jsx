import { DigitText } from "@cthit/react-digit-components";
import React from "react";

export const Melody = ({ melody, melody_link }) => {
    const MelodyText = <DigitText.Text text={melody} />;
    if (melody_link) {
        return <a href={melody_link}>{MelodyText}</a>;
    } else {
        return MelodyText;
    }
};
