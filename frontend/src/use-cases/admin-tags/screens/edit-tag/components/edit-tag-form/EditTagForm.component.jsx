import { useHistory } from "react-router-dom";
import React, { useCallback, useState } from "react";
import {
    DigitButton,
    DigitForm,
    DigitIconButton,
    DigitLayout,
    DigitText,
    useDigitCustomDialog,
    useDigitToast,
    useDigitTranslations
} from "@cthit/react-digit-components";
import * as yup from "yup";
import { useSongs } from "../../../../../../app/Songs.context";
import { navHandleTags } from "../../../../../../app/App.routes";
import { editTag } from "../../../../../../api/tags/put.tags.api";
import ErrorCard from "../../../../../../common/components/error-card";
import MainFormCard from "../../../../../../common/components/main-form-card";
import { ArrowBack } from "@material-ui/icons";
import {
    TagFormFields,
    tagInitialValues,
    tagValidationSchema
} from "../../../../components/tag-form/TagForm.utils";
import { deleteTag } from "../../../../../../api/tags/delete.tags.api";

const defineDeleteDialog = (text, deleteFunction) => ({
    renderMain: () => <DigitText.Text bold text={text.DeleteTagConfirm} />,
    renderButtons: (confirm, cancel) => (
        <>
            <DigitButton
                text={text.DeleteTag}
                secondary
                raised
                submit
                onClick={confirm}
            />

            <DigitButton text={text.Cancel} raised primary onClick={cancel} />
        </>
    ),
    onConfirm: () => deleteFunction()
});

export const EditTagForm = ({ tag, setSomethingWrong }) => {
    const history = useHistory();
    const [text] = useDigitTranslations();
    const [queueToast] = useDigitToast();
    const [openDeleteDialog] = useDigitCustomDialog();
    const [error, setError] = useState({ isError: false, message: "" });

    const { refetchSongsAndTags } = useSongs();

    const performUpdate = useCallback(
        async values => {
            try {
                await editTag(tag.tag_id, values);
                queueToast({
                    text: text.EditTagSuccessful
                });
                await refetchSongsAndTags();
                navHandleTags(history);
            } catch (error) {
                queueToast({
                    text: text.EditTagFailed
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
        [tag, text, queueToast, refetchSongsAndTags, history, setSomethingWrong]
    );

    const performDelete = useCallback(async () => {
        try {
            await deleteTag(tag.tag_id);
            queueToast({
                text: text.DeleteTagSuccessful
            });
            await refetchSongsAndTags();
            navHandleTags(history);
        } catch (error) {
            queueToast({
                text: text.DeleteTagFailed
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
    }, [
        tag,
        history,
        text,
        queueToast,
        setSomethingWrong,
        refetchSongsAndTags
    ]);

    return (
        <DigitForm
            initialValues={tagInitialValues(tag)}
            validationSchema={tagValidationSchema(yup, text)}
            onSubmit={values => performUpdate(values)}
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
                                    text={text.EditTag + ": " + tag.name}
                                />
                            </DigitLayout.Row>

                            <TagFormFields />

                            <DigitLayout.Row justifyContent={"space-between"}>
                                <DigitButton
                                    raised
                                    secondary
                                    text={text.DeleteTag}
                                    onClick={() =>
                                        openDeleteDialog(
                                            defineDeleteDialog(text, () =>
                                                performDelete()
                                            )
                                        )
                                    }
                                />

                                <DigitButton
                                    raised
                                    submit
                                    primary
                                    text={text.Save}
                                    disabled={Object.keys(errors).length !== 0}
                                />
                            </DigitLayout.Row>
                        </MainFormCard>
                    </>
                );
            }}
        />
    );
};
