import React from "react";
import {
    DigitAutocompleteSelectMultiple,
    DigitDesign,
    DigitText,
    DigitLayout,
    DigitTextField,
    useDigitTranslations
} from "@cthit/react-digit-components";
import { useSongs } from "../../../../Songs.context";

const SearchBar = ({ filterTextState, filterTagsState }) => {
    const [text] = useDigitTranslations();

    return (
        <DigitDesign.Card>
            <DigitDesign.CardBody>
                <DigitText.Title text={text.Browse} />
                <DigitLayout.Row flexWrap={"wrap"}>
                    <SearchField filterTextState={filterTextState} />
                    <TagFilter filterTagsState={filterTagsState} />
                </DigitLayout.Row>
            </DigitDesign.CardBody>
        </DigitDesign.Card>
    );
};

const TagFilter = ({ filterTagsState }) => {
    const { filterTags, setFilterTags } = filterTagsState;
    const { tags } = useSongs();
    const [text] = useDigitTranslations();

    const options = tags
        .map(tag => ({ text: tag.name, value: tag.tag_id }))
        .sort((a, b) => (a.text > b.text ? 1 : -1));

    return (
        <DigitAutocompleteSelectMultiple
            outlined
            upperLabel={text.FilterTag}
            options={options}
            value={filterTags}
            margin={"!important"} // Unclear why this is necessary for TagFilter and SearchField to align
            size={{ width: "300px" }}
            onChange={e => setFilterTags(e.target.value)}
        />
    );
};

const SearchField = ({ filterTextState }) => {
    const { filterText, setFilterText } = filterTextState;
    const [text] = useDigitTranslations();

    return (
        <DigitTextField
            value={filterText}
            upperLabel={text.FilterSearch}
            size={{ width: "300px" }}
            outlined
            onChange={e => setFilterText(e.target.value)}
        />
    );
};

export default SearchBar;
