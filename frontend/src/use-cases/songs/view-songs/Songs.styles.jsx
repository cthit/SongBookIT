import styled from "styled-components";
import {DigitDesign} from "@cthit/react-digit-components";

export const ScreenContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const SongCardBody = styled(DigitDesign.CardBody)`
  display: flex;
  flex-direction: column;
`;

export const TagList = styled.div`
  margin-top: auto;
  flex-direction: row;
`;

