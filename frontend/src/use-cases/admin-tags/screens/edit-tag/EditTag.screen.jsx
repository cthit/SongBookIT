import React, { useEffect, useState } from "react";
import { DigitLayout } from "@cthit/react-digit-components";
import { useParams } from "react-router-dom";
import FourZeroFour from "../../../../common/components/four-zero-four";
import EditTagForm from "./components/edit-tag-form";
import FiveZeroZero from "../../../../common/components/five-zero-zero";
import CenterLoading from "../../../../common/components/center-loading";
import { getTag } from "../../../../api/tags/get.tags.api";

export const EditTag = () => {
    const { tag_id } = useParams();
    const [faultyTagId, setFaultyTagId] = useState(false);
    const [tagToEdit, setTagToEdit] = useState(null);
    const [somethingWrong, setSomethingWrong] = useState(false);

    useEffect(() => {
        getTag(tag_id)
            .then(res => {
                setTagToEdit(res.data.data.tag);
                setFaultyTagId(false);
            })
            .catch(err => {
                setFaultyTagId(true);
            });
    }, [tag_id]);

    if (faultyTagId) {
        return <FourZeroFour />;
    }

    if (somethingWrong) {
        return <FiveZeroZero />;
    }

    return (
        <>
            <CenterLoading loading={tagToEdit === null} />
            {tagToEdit !== null && (
                <DigitLayout.Column centerHorizontal>
                    <EditTagForm
                        tag={tagToEdit}
                        setSomethingWrong={setSomethingWrong}
                    />
                </DigitLayout.Column>
            )}
        </>
    );
};
