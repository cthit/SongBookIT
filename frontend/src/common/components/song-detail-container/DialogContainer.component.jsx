import styled from "styled-components";

export const DialogContainer = styled.div`
    width: min(
        100vw - (2 * 24px) - (2 * 32px),
        600px - (2 * 24px)
    ); // Digit dialog has a max width of 600 px and 24px padding inside
`;
