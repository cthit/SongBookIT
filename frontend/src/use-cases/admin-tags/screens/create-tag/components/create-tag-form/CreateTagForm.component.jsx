import { useHistory } from "react-router-dom";
import {
    DigitButton,
    DigitForm,
    DigitIconButton,
    DigitLayout,
    DigitText,
    useDigitToast,
    useDigitTranslations
} from "@cthit/react-digit-components";
import React, { useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import { ArrowBack } from "@material-ui/icons";
import { useSongs } from "../../../../../songs/Songs.context";
import { addTag } from "../../../../../../api/tags/post.tags.api";
import { navHandleTags } from "../../../../../../app/App.routes";
import {
    TagFormFields,
    tagInitialValues,
    tagValidationSchema
} from "../../../../components/tag-form/TagForm.utils";
import CenterLoading from "../../../../../../common/components/center-loading";
import ErrorCard from "../../../../../../common/components/error-card";
import MainFormCard from "../../../../../../common/components/main-form-card";

export const CreateTagForm = ({ setSomethingWrong }) => {
    const { tags, refetchTags } = useSongs();
    const [queueToast] = useDigitToast();
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [text] = useDigitTranslations();
    const [error, setError] = useState({ isError: false, message: "" });

    useEffect(() => {
        refetchTags().then(() => setLoading(false));
    }, [refetchTags]);

    const performCreate = useCallback(
        async values => {
            try {
                const res = await addTag(values);
                queueToast({
                    text: text.AddTagSuccessful
                });
                await refetchTags();
                navHandleTags(history);
            } catch (error) {
                queueToast({
                    text: text.AddTagFailed
                });
                if (error.response.status === 500) {
                    setSomethingWrong(true);
                } else {
                    setError({
                        isError: error.response.data.error.isError,
                        message: text[error.response.data.error.message]
                    });
                }
            }
        },
        [history, queueToast, setSomethingWrong, text]
    );

    if (loading) {
        return <CenterLoading loading={loading} />;
    }

    return (
        <DigitForm
            initialValues={tagInitialValues()}
            validationSchema={tagValidationSchema(yup, text)}
            onSubmit={values => performCreate(values)}
            render={({ errors }) => {
                return (
                    <>
                        {error.isError && <ErrorCard message={error.message} />}
                        <MainFormCard>
                            <DigitLayout.Row alignItems={"center"}>
                                <DigitIconButton
                                    icon={ArrowBack}
                                    onClick={() => history.goBack()}
                                />
                                <DigitText.Text
                                    bold
                                    alignCenter
                                    text={text.AddTag}
                                />
                            </DigitLayout.Row>
                            <TagFormFields />
                            <DigitButton
                                raised
                                submit
                                text={text.Save}
                                primary
                                disabled={Object.keys(errors).length !== 0}
                            />
                        </MainFormCard>
                    </>
                );
            }}
        />
    );
};
