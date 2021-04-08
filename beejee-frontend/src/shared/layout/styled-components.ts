import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  background: #333333;
  box-sizing: border-box;
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0px;
    overflow-y: auto;
  }
`;
