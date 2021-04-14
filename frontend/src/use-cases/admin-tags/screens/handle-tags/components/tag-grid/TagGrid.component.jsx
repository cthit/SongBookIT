import React, { useMemo } from "react";
import { useDigitTranslations } from "@cthit/react-digit-components";
import TagCard from "../../../../../admin-tags/screens/handle-tags/components/tag-grid/tag-card";
import styled from "styled-components";

const TagRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 10px;
    column-gap: 10px;
`;

export const TagGrid = ({ tags }) => {
    const [text] = useDigitTranslations();

    return useMemo(
        () => (
            <TagRow>
                {tags.map(t => (
                    <TagCard key={t.tag_id} tag={t} text={text} />
                ))}
            </TagRow>
        ),
        [text, tags]
    );
};
