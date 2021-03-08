import styled from "styled-components";
import { DigitDesign } from "@cthit/react-digit-components";

export const ColumnContainer = styled.div`
    display: flex;
    width: 100vw;
    flex-direction: column;
`;

export const CenterContainer = styled.div`
    display: block;
    margin-left: auto;
    margin-right: auto;
`;

export const WideCenterContainer = styled(CenterContainer)`
    width: min(80vw, 600px);
`;

export const TopRightButton = styled.div`
    width: 100vw;
`;

export const DangerCard = styled(DigitDesign.Card)`
    background-color: #e3242b;
    margin: 15px;
    max-width: 500px;
`;
