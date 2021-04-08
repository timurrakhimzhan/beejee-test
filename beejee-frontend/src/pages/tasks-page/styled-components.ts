import styled from "styled-components";

export const TasksPageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    display: flex;
    flex-direction: column;
    padding: 24px;
    width: 80%;
    border-radius: 10px;
    background: white;
  };
  .row {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  };
`;