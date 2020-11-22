import React from "react";
import {
    DigitDesign,
    DigitText
} from "@cthit/react-digit-components";
import { DangerCard } from "./Common.styles";


const ErrorTextCard = ({message}) => (
    <DangerCard>
        <DigitDesign.CardBody>
            <DigitText.Text text={message}/>
        </DigitDesign.CardBody>
    </DangerCard>

        );
export { ErrorTextCard }