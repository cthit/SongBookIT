import React, {useState} from "react";
import {
    DigitDesign,
    DigitText,
    DigitAutocompleteSelectMultiple,
    DigitTextField,
    useDigitTranslations
} from "@cthit/react-digit-components";
import {useStateValue, SongTagActions} from "../../Songs.context";
import {FilterBody} from "./views.styles";

const TagFilter = () => {
    const [{tags}, dispatch] = useStateValue();
    const [text] = useDigitTranslations();

    const options = tags
        .map(tag => {
            return {text: tag.name, value: tag.tag_id};
        })
        .sort((a, b) => (a.text > b.text ? 1 : -1));
    const [value, setValue] = useState([]);

    return (
        <DigitAutocompleteSelectMultiple
            outlined
            upperLabel={text.FilterTag}
            options={options}
            value={value}
            margin={"!important"} // Unclear why this is necessary for TagFilter and SearchField to align
            size={{width: "300px"}}
            onChange={e => {
                setValue(e.target.value);
                dispatch({
                    type: SongTagActions.filterTags,
                    tags: e.target.value
                });
            }}
        />
    );
};

const SearchField = () => {
    const [searchText, setSearchText] = useState("");
    const [, dispatch] = useStateValue();
    const [text] = useDigitTranslations();

    return (
        <DigitTextField
            value={searchText}
            upperLabel={text.FilterSearch}
            size={{width: "300px"}}
            onChange={e => {
                setSearchText(e.target.value);
                dispatch({
                    type: SongTagActions.filterSearch,
                    search: e.target.value
                });
            }}
            outlined
        />
    );
};

const SearchBar = () => {
    const [text] = useDigitTranslations();

    return (
        <DigitDesign.Card>
            <DigitDesign.CardBody>
                <DigitText.Title text={text.Browse}/>
                <FilterBody>
                    <SearchField/>
                    <TagFilter/>
                </FilterBody>
            </DigitDesign.CardBody>
        </DigitDesign.Card>
    );
};

export default SearchBar;
