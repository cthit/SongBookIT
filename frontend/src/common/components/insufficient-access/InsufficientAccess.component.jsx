import React from "react";
import { useDigitTranslations } from "@cthit/react-digit-components";
import InformationCard from "../information-card";

export const InsufficientAccess = () => {
    const [text] = useDigitTranslations();

    return (
        <InformationCard
            title={text.InsufficientAccess}
            imageSrc={"/images/403.gif"}
            info={text.YouDontHaveAccess}
        />
    );
};
