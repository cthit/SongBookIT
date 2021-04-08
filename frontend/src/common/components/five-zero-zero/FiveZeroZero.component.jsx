import React from "react";
import {
    DigitButton,
    DigitDesign,
    DigitText,
    useDigitTranslations
} from "@cthit/react-digit-components";
import { BASE_ROUTE } from "../../../app/App.routes";

export const FiveZeroZero = () => {
    const [text] = useDigitTranslations();

    return (
        <DigitDesign.Card margin={"auto"} size={{ width: "300px" }}>
            <DigitDesign.CardHeader>
                <DigitDesign.CardTitle text={text.SomethingWentWrong} />
            </DigitDesign.CardHeader>
            <DigitDesign.CardHeaderImage src="/images/500.jpg" />
            <DigitDesign.CardBody>
                <DigitText.Text text={text.Contact} />
            </DigitDesign.CardBody>
            <DigitDesign.CardButtons>
                <DigitDesign.Link to={BASE_ROUTE}>
                    <DigitButton outlined text={text.Back} />
                </DigitDesign.Link>
            </DigitDesign.CardButtons>
        </DigitDesign.Card>
    );
};
