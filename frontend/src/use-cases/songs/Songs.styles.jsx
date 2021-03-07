import styled from "styled-components";
import { DigitDesign } from "@cthit/react-digit-components";

export const ScreenContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export const SongGrid = styled.div`
    display: grid;
    margin-top: 10px;
    align-items: center;
    justify-items: center;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    column-gap: 10px;
`;

export const SongCard = styled(DigitDesign.Card)`
    width: 300px;
    margin: 5px;
`;

export const SongCardBody = styled(DigitDesign.CardBody)`
    display: flex;
    flex-direction: column;
`;

export const TagList = styled.div`
    margin-top: auto;
    flex-direction: row;
`;
