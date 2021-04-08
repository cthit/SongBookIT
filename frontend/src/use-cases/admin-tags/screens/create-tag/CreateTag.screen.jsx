import React, { useState } from "react";
import { DigitLayout } from "@cthit/react-digit-components";
import FiveZeroZeroComponent from "../../../../common/components/five-zero-zero";
import CreateTagForm from "./components/create-tag-form";

export const CreateTag = () => {
    const [somethingWrong, setSomethingWrong] = useState(false);

    if (somethingWrong) {
        return <FiveZeroZeroComponent />;
    }

    return (
        <DigitLayout.Column centerHorizontal>
            <CreateTagForm setSomethingWrong={setSomethingWrong} />
        </DigitLayout.Column>
    );
};
