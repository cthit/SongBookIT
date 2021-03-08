import React, { useState } from "react";
import {
    DigitDesign,
    DigitText,
    DigitAutocompleteSelectMultiple,
    DigitTextField
} from "@cthit/react-digit-components";
import { useStateValue, SongTagActions } from "../../Songs.context";
import { FilterBody } from "./views.styles";

const TagFilter = () => {
    const [{ tags }, dispatch] = useStateValue();

    const options = tags
        .map(tag => {
            return { text: tag.name, value: tag.tag_id };
        })
        .sort((a, b) => (a.text > b.text ? 1 : -1));
    const [value, setValue] = useState([]);

    return (
        <DigitAutocompleteSelectMultiple
            outlined
            upperLabel="Filter the songs by tags"
            options={options}
            value={value}
            margin={"!important"} // Unclear why this is necessary for TagFilter and SearchField to align
            size={{ width: "300px" }}
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

    return (
        <DigitTextField
            value={searchText}
            upperLabel="Search for a song"
            size={{ width: "300px" }}
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

const SearchBar = () => (
    <DigitDesign.Card>
        <DigitDesign.CardBody>
            <DigitText.Title text={"Search or browse the songs"} />
            <FilterBody>
                <SearchField />
                <TagFilter />
            </FilterBody>
        </DigitDesign.CardBody>
    </DigitDesign.Card>
);

export default SearchBar;
