import React from "react";
import { useDigitTranslations } from "@cthit/react-digit-components";
import InformationCard from "../information-card";

export const FiveZeroZero = () => {
    const [text] = useDigitTranslations();

    return (
        <InformationCard
            title={text.SomethingWentWrong}
            imageSrc={"/images/500.jpg"}
            info={text.Contact}
            backButton
        />
    );
};
