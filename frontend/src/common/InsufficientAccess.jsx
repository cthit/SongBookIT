import React from "react";
import {
    DigitDesign,
    DigitLayout,
    DigitText,
    useDigitTranslations
} from "@cthit/react-digit-components";

const InsufficientAccess = () => {
    return (
        <DigitLayout.Center>
            <DigitDesign.Card size={{ width: "300px" }}>
                <DigitDesign.CardHeader>
                    <DigitDesign.CardTitle text={"Nope"} />
                </DigitDesign.CardHeader>
                <DigitDesign.CardHeaderImage src="/403.gif" alt="This is so sad" />
                <DigitDesign.CardBody>
                    <DigitText.Text text={"lel nope, Git out ya wanker"} />
                </DigitDesign.CardBody>
            </DigitDesign.Card>
        </DigitLayout.Center>
    );
};

export default InsufficientAccess;