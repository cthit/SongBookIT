import { DigitDesign, DigitLayout } from "@cthit/react-digit-components";
import React from "react";

export const MainFormCard = ({ children }) => (
    <DigitDesign.Card size={{ width: "min(80vw, 600px)" }}>
        <DigitDesign.CardBody>
            <DigitLayout.Column>{children}</DigitLayout.Column>
        </DigitDesign.CardBody>
    </DigitDesign.Card>
);
