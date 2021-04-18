import {
    DigitButton,
    DigitDesign,
    DigitLayout,
    DigitText,
    useDigitTranslations
} from "@cthit/react-digit-components";
import React from "react";

export const NavMyPages = () => {
    const [text] = useDigitTranslations();

    return (
        <DigitDesign.Card margin={{ left: "auto", right: "auto" }}>
            <DigitDesign.CardBody>
                <DigitText.Title text={text.MyPages} />
                <DigitLayout.Row>
                    <DigitButton outlined text={text.FavoriteSongs} />
                </DigitLayout.Row>
            </DigitDesign.CardBody>
        </DigitDesign.Card>
    );
};
