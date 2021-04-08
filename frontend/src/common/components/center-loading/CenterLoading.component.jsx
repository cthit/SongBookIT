import { DigitLoading } from "@cthit/react-digit-components";
import React from "react";

export const CenterLoading = ({ loading }) => (
    <DigitLoading
        margin={{ right: "auto", left: "auto", top: "32px" }}
        loading={loading}
    />
);
