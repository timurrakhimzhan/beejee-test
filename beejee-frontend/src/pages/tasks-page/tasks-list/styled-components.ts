import styled from "styled-components";

export const TasksListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  table {
    thead {
      text-align: left;
    }
    th, td {
      padding: 10px 25px
    }
  }
  .pagination {
    width: 100%;
    justify-content: center;
    display: flex;
    flex-direction: row;
  }
`;