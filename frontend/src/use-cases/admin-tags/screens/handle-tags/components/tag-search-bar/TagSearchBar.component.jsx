import React from "react";
import {
    DigitDesign,
    DigitText,
    DigitLayout,
    DigitTextField,
    useDigitTranslations
} from "@cthit/react-digit-components";

export const TagSearchBar = ({ filterTextState }) => {
    const [text] = useDigitTranslations();

    return (
        <DigitDesign.Card>
            <DigitDesign.CardBody>
                <DigitText.Title text={text.HandleTags} />
                <DigitLayout.Row flexWrap={"wrap"}>
                    <SearchField filterTextState={filterTextState} />
                </DigitLayout.Row>
            </DigitDesign.CardBody>
        </DigitDesign.Card>
    );
};

const SearchField = ({ filterTextState }) => {
    const { filterText, setFilterText } = filterTextState;
    const [text] = useDigitTranslations();

    return (
        <DigitTextField
            value={filterText}
            upperLabel={text.SearchTags}
            outlined
            onChange={e => setFilterText(e.target.value)}
        />
    );
};
