import React from "react";
import {
    DigitLayout,
    DigitDesign,
    DigitText
} from "@cthit/react-digit-components";
import { BASE_ROUTE } from "../../App.routes";

const Header = () => (
    <DigitLayout.Row
        flex={"1"}
        alignItems={"center"}
        justifyContent={"space-between"}
    >
        <DigitDesign.Link to={BASE_ROUTE}>
            <DigitText.Title text={"Songbook"} />
        </DigitDesign.Link>
    </DigitLayout.Row>
);

export default Header;
