import React, { useState } from "react";
import {
    DigitDesign,
    DigitTextField,
    DigitAutocompleteSelectMultiple,
} from "@cthit/react-digit-components";
import { useStateValue, StateActions } from "../../../app/App.context";

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
            onChange={e => {
                setValue(e.target.value);
                dispatch({
                    type: StateActions.filterTags,
                    tags: e.target.value,
                });
            }}
        />
    );
};

const SearchField = () => {
    const [searchText, setSearchText] = useState("");
    const [{}, dispatch] = useStateValue();

    return (
        <DigitTextField
            value={searchText}
            upperLabel="Search for a song"
            onChange={e => {
                setSearchText(e.target.value);
                dispatch({
                    type: StateActions.filterSearch,
                    search: e.target.value,
                });
            }}
            outlined
        />
    );
};

const SearchBar = () => (
    <DigitDesign.Card>
        <DigitDesign.CardBody>
            <SearchField />
            <TagFilter />
        </DigitDesign.CardBody>
    </DigitDesign.Card>
);

export default SearchBar;