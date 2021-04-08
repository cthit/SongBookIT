import {
    DigitDesign,
    DigitText,
    DigitLayout,
    DigitButton
} from "@cthit/react-digit-components";
import React from "react";
import { ADMIN_TAGS_EDIT_ROUTE } from "../../../../../../../app/App.routes";

export const TagCard = ({ tag, text }) => (
    <DigitDesign.Card flex={"auto"}>
        <DigitDesign.CardBody>
            <DigitLayout.Column>
                <DigitText.Title text={tag.name} />
                <DigitText.Text
                    bold
                    text={text.TagNameSV + ": " + tag.pretty_name_sv}
                />
                <DigitText.Text
                    text={text.TagNameEN + ": " + tag.pretty_name_en}
                />
                <DigitLayout.Row>
                    <DigitDesign.Link
                        to={ADMIN_TAGS_EDIT_ROUTE + "/" + tag.tag_id}
                    >
                        <DigitButton primary outlined text={text.EditTag} />
                    </DigitDesign.Link>
                </DigitLayout.Row>
            </DigitLayout.Column>
        </DigitDesign.CardBody>
    </DigitDesign.Card>
);
