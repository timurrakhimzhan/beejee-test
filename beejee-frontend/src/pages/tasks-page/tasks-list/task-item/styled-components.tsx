import styled from "styled-components";

export const StatusStateWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Row = styled.tr`
  :hover {
    background: floralwhite;
  }
`;

export const StatusStateCell = styled.td`
  display: flex;
  align-items: center;
  label {
    width: min-content;
  }

  img {
    height: 20px;
    width: 20px;
    cursor: pointer;
  }
`

export const Cell = styled.td`
  max-width: 120px;
  overflow-x: auto;
  padding: 10px 20px;
`;