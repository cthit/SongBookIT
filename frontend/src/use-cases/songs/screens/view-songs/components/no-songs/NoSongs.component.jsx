import React from "react";
import {
    useDigitTranslations,
    DigitDesign,
    DigitText,
    DigitButton
} from "@cthit/react-digit-components";

export const NoSongs = ({ resetFilters }) => {
    const [text] = useDigitTranslations();

    return (
        <DigitDesign.Card
            margin={{ left: "auto", right: "auto", top: "32px" }}
            size={{ width: "300px" }}
        >
            <DigitDesign.CardBody>
                <DigitText.Text text={text.NoMatchingSongs} />
            </DigitDesign.CardBody>
            <DigitDesign.CardButtons>
                <DigitButton
                    onClick={() => resetFilters()}
                    outlined
                    text={text.ResetFilters}
                />
            </DigitDesign.CardButtons>
        </DigitDesign.Card>
    );
};
