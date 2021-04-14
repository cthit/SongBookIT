import React from "react";
import {
    useDigitTranslations,
    DigitDesign,
    DigitText
} from "@cthit/react-digit-components";

export const NoFavorites = () => {
    const [text] = useDigitTranslations();

    return (
        <DigitDesign.Card
            margin={{ left: "auto", right: "auto", top: "32px" }}
            size={{ width: "300px" }}
        >
            <DigitDesign.CardBody>
                <DigitText.Text text={text.NoFavorites} />
            </DigitDesign.CardBody>
        </DigitDesign.Card>
    );
};
