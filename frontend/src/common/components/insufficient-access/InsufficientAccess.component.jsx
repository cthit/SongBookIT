import React from "react";
import {
    DigitButton,
    DigitDesign,
    DigitText,
    useDigitTranslations
} from "@cthit/react-digit-components";
import { BASE_ROUTE } from "../../../app/App.routes";

export const InsufficientAccess = () => {
    const [text] = useDigitTranslations();

    return (
        <DigitDesign.Card margin={"auto"} size={{ width: "300px" }}>
            <DigitDesign.CardHeader>
                <DigitDesign.CardTitle text={text.InsufficientAccess} />
            </DigitDesign.CardHeader>
            <DigitDesign.CardHeaderImage src="/images/403.gif" />
            <DigitDesign.CardBody>
                <DigitText.Text text={text.YouDontHaveAccess} />
            </DigitDesign.CardBody>
            <DigitDesign.CardButtons>
                <DigitDesign.Link to={BASE_ROUTE}>
                    <DigitButton outlined text={text.Back} />
                </DigitDesign.Link>
            </DigitDesign.CardButtons>
        </DigitDesign.Card>
    );
};
