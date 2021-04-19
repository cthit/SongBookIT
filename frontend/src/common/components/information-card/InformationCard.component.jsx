import React from "react";
import {
    DigitButton,
    DigitDesign,
    DigitText,
    useDigitTranslations
} from "@cthit/react-digit-components";
import { BASE_ROUTE } from "../../../app/App.routes";

export const InformationCard = ({
    title = null,
    imageSrc = null,
    info = null,
    backButton = false
}) => {
    const [text] = useDigitTranslations();

    return (
        <DigitDesign.Card margin={"auto"} size={{ width: "300px" }}>
            {title !== null && (
                <DigitDesign.CardHeader>
                    <DigitDesign.CardTitle text={title} />
                </DigitDesign.CardHeader>
            )}
            {imageSrc !== null && (
                <DigitDesign.CardHeaderImage src={imageSrc} />
            )}
            {info !== null && (
                <DigitDesign.CardBody>
                    <DigitText.Text text={info} />
                </DigitDesign.CardBody>
            )}
            {backButton && (
                <DigitDesign.CardButtons>
                    <DigitDesign.Link to={BASE_ROUTE}>
                        <DigitButton outlined text={text.Back} />
                    </DigitDesign.Link>
                </DigitDesign.CardButtons>
            )}
        </DigitDesign.Card>
    );
};
