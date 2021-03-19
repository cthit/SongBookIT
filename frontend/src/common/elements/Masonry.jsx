import React, { useEffect, useRef, useState } from "react";

import { useEventListener } from "../hooks/useEventListener";
import styled from "styled-components";

export const MasonryDiv = styled.div`
    margin-top: 10px;
    display: grid;
    grid-auto-flow: column;
    grid-gap: ${props => props.gap || `1em`};
`;

export const Col = styled.div`
    display: grid;
    justify-content: center;
    grid-gap: ${props => props.gap || `1em`};
`;

const fillCols = (children, cols) => {
    children.forEach((child, i) => cols[i % cols.length].push(child));
};

export default function Masonry({ children, gap, minWidth = 400, ...rest }) {
    const ref = useRef();
    const [numCols, setNumCols] = useState(3);
    const cols = [...Array(numCols)].map(() => []);
    fillCols(children, cols);

    const resizeHandler = () =>
        setNumCols(Math.ceil(ref.current.offsetWidth / minWidth));
    useEffect(resizeHandler, []);
    useEventListener(`resize`, resizeHandler);

    return (
        <MasonryDiv ref={ref} gap={gap} {...rest}>
            {[...Array(numCols)].map((_, index) => (
                <Col key={index} gap={gap}>
                    {cols[index]}
                </Col>
            ))}
        </MasonryDiv>
    );
}
