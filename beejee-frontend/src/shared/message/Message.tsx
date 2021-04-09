import styled from "styled-components";

const Message = styled.span`
  font-size: 0.6em;
  color: ${({error}: {error: boolean}) => error ? `darkred` : `green`};
`;

export default Message;