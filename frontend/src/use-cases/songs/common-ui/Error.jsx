import React from "react";
import {
    DigitDesign,
    DigitText
} from "@cthit/react-digit-components";


const ErrorTextCard = ({message}) => (
    <DigitDesign.Card>
        <DigitDesign.CardBody>
            <DigitText.Text text={"erooroorormf??"}/>
        </DigitDesign.CardBody>
    </DigitDesign.Card>
);
export { ErrorTextCard }