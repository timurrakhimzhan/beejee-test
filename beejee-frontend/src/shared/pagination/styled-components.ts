import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
  color: black;
  .pageItem {
    cursor: pointer;
    margin-right: 5px;
  };
  .active {
    color: darkcyan;
  }
`