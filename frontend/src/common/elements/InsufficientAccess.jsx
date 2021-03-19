import React from "react";
import {
    DigitButton,
    DigitDesign,
    DigitText,
    useDigitTranslations
} from "@cthit/react-digit-components";
import { useHistory } from "react-router-dom";
import { navHome } from "../../app/App.Routes";

const InsufficientAccess = () => {
    const [text] = useDigitTranslations();
    const history = useHistory();

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
                <DigitButton
                    onClick={() => navHome(history)}
                    outlined
                    text={text.Back}
                />
            </DigitDesign.CardButtons>
        </DigitDesign.Card>
    );
};

export default InsufficientAccess;
