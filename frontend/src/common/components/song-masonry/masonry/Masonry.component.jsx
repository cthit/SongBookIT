import React, { useEffect, useRef, useState } from "react";

import { useEventListener } from "./useEventListener";
import styled from "styled-components";

export const MasonryDiv = styled.div`
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(${props => props.numCols || 3}, 1fr);
    grid-gap: ${props => props.gap || `1em`};
`;

export const Col = styled.div`
    display: grid;
    align-content: start;
    grid-gap: ${props => props.gap || `1em`};
`;

const fillCols = (children, cols) => {
    children.forEach((child, i) => cols[i % cols.length].push(child));
};

// Inspiration form here https://publiuslogic.com/blog/react-hooks-masonry/
export function Masonry({ children, gap, minWidth = 400, ...rest }) {
    const ref = useRef();
    const [numCols, setNumCols] = useState(1);
    const cols = [...Array(numCols)].map(() => []);

    const resizeHandler = () => {
        if (ref && ref.current) {
            setNumCols(Math.ceil(ref.current.offsetWidth / minWidth));
        }
    };
    useEffect(resizeHandler, []);
    useEventListener(`resize`, resizeHandler);

    // INFINITE LOADER
    // Inspiration from here https://dev.to/hunterjsbit/react-infinite-scroll-in-few-lines-588f
    const [page, setPage] = useState(2);
    const songsPerPage = Math.max(numCols * 2, 7);
    useEffect(() => setPage(2), [children]);

    const loader = useRef(null);
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "100px",
            threshold: [1, 0.5, 0.25, 0.1, 0.05, 0]
        };
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current);
        }
    }, []);

    const handleObserver = entities => {
        const target = entities[0];
        if (target.isIntersecting) {
            setPage(page => page + 1);
        }
    };

    fillCols(children.slice(0, songsPerPage * page), cols);

    return (
        <>
            <MasonryDiv ref={ref} gap={gap} numCols={numCols} {...rest}>
                {[...Array(numCols)].map((_, index) => (
                    <Col key={index} gap={gap}>
                        {cols[index]}
                    </Col>
                ))}
            </MasonryDiv>
            <div ref={loader} />
        </>
    );
}
