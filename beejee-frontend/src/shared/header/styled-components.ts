import styled from "styled-components";

export const HeaderWrapper = styled.header`
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 12px;
  margin: 0;
  box-sizing: border-box;
  button {
    height: 40px;
    font-size: 1em;
    border-radius: 5px;
    border: none;
    text-transform: uppercase;
    width: 100px;
    cursor: pointer;
  }
  .not-chosen {
    color: white;
    background: none;
    transition: all 0.2s;
    :hover {
      background: darkcyan;
      color: black;
    }
  }
  .chosen {
    cursor: unset;
    background: darkcyan;
  }
`;