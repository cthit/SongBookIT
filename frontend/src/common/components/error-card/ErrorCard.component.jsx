import React from "react";
import { DigitDesign, DigitText } from "@cthit/react-digit-components";
import styled from "styled-components";

export const DangerCard = styled(DigitDesign.Card)`
    background-color: #c45b5b;
    margin: 15px;
    max-width: 500px;
`;

export const ErrorCard = ({ message }) => (
    <DangerCard>
        <DigitDesign.CardBody>
            <DigitText.Text text={message} />
        </DigitDesign.CardBody>
    </DangerCard>
);
