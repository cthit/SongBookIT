import React from "react";
import {
    useDigitTranslations,
    DigitDesign,
    DigitText,
    DigitButton
} from "@cthit/react-digit-components";
import { BASE_ROUTE } from "../../../app/App.routes";

export const FourZeroFour = () => {
    const [text] = useDigitTranslations();

    return (
        <DigitDesign.Card margin={"auto"} size={{ width: "300px" }}>
            <DigitDesign.CardHeader>
                <DigitDesign.CardTitle text={text.PageNotFound} />
            </DigitDesign.CardHeader>
            <DigitDesign.CardHeaderImage src="/images/404.jpg" />
            <DigitDesign.CardBody>
                <DigitText.Text
                    text={
                        "This is not the site you're looking for! \n" +
                        text.ContactDigit
                    }
                />
            </DigitDesign.CardBody>
            <DigitDesign.CardButtons>
                <DigitDesign.Link to={BASE_ROUTE}>
                    <DigitButton outlined text={text.Back} />
                </DigitDesign.Link>
            </DigitDesign.CardButtons>
        </DigitDesign.Card>
    );
};
