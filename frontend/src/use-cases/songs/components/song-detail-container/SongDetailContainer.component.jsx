import styled from "styled-components";

export const SongDetailContainer = styled.div`
    width: min(
        100vw - (2 * 24px) - (2 * 32px),
        600px - (2 * 24px)
    ); // Digit dialog has a max width of 600 px and 28px padding inside
`;
