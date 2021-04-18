import React from "react";
import { useDigitTranslations } from "@cthit/react-digit-components";
import InformationCard from "../information-card";

export const FourZeroFour = () => {
    const [text] = useDigitTranslations();

    return (
        <InformationCard
            title={text.PageNotFound}
            imageSrc={"/images/404.jpg"}
            info={
                "This is not the site you're looking for! \n" +
                text.ContactDigit
            }
            backButton
        />
    );
};
