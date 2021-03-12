import styled from "styled-components";
import {DigitDesign} from "@cthit/react-digit-components";

export const TopLeftPosition = styled.div`
  position: sticky;
  left: 16px;
  top: 16px;
`;

export const DangerCard = styled(DigitDesign.Card)`
  background-color: #c45b5b;
  margin: 15px;
  max-width: 500px;
`;
