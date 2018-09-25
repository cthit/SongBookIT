import React from "react";
import { DigitTextField } from "@cthit/react-digit-components";

const SearchField = (
    <DigitTextField
        onChange={() => console.log("New value: ")}
        value={""}
        upperLabel="Sök efter låtar.."
    />
);

export default SearchField;
