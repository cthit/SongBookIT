import React, { useEffect, useState } from "react";
import {
    DigitFAB,
    DigitLayout,
    DigitDesign
} from "@cthit/react-digit-components";
import { useSongs } from "../../../../app/Songs.context";
import CenterLoading from "../../../../common/components/center-loading/";
import TagSearchBar from "./components/tag-search-bar";
import * as fuzzysort from "fuzzysort";
import AddIcon from "@material-ui/icons/Add";
import TagGrid from "./components/tag-grid";
import { ADMIN_TAGS_CREATE_ROUTE } from "../../../../app/App.routes";

const HandleTagsScreen = () => {
    const { tags, loading } = useSongs();

    const [filterText, setFilterText] = useState("");
    const [filteredTags, setFilteredTags] = useState(tags);

    useEffect(() => {
        if (filterText === "") {
            setFilteredTags(tags);
        } else {
            const res = fuzzysort.go(filterText, tags, {
                keys: ["name", "pretty_name_sv", "pretty_name_en"],
                allowTypo: false,
                threshold: -500
            });
            setFilteredTags(res.map(r => r.obj));
        }
    }, [filterText, tags]);

    return (
        <>
            <DigitLayout.Column flex={"1"}>
                <TagSearchBar filterTextState={{ filterText, setFilterText }} />
                <CenterLoading loading={loading} />
                <TagGrid tags={filteredTags} />
            </DigitLayout.Column>

            <DigitLayout.DownRightPosition>
                <DigitDesign.Link to={ADMIN_TAGS_CREATE_ROUTE}>
                    <DigitFAB secondary icon={AddIcon} />
                </DigitDesign.Link>
            </DigitLayout.DownRightPosition>
        </>
    );
};

export default HandleTagsScreen;
