import styled from "styled-components";

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  width: auto;
  .message {
    margin-left: auto;
    margin-right: auto;
    margin-top: 2px;
    font-size: 0.6em;
  }
  .serverError {
    color: darkred;
  }
  .serverMessage {
    color: green;
  }
  .input-item {
    display: flex;
    flex-direction: column;
    label {
      margin-bottom: 10px;
      font-size: 0.8em;
    }
    input {
      height: 30px;
      border-radius: 5px;
      border: 1px dimgrey solid;
      width: 300px;
      font-size: 0.9em;
    }
    textarea {
      border-radius: 5px;
      border: 1px dimgrey solid;
      width: 300px;
      font-size: 0.9em;
    }
    .error {
      color: darkred;
      margin-top: 2px;
      font-size: 0.6em;
    }
  }
`;

export default CustomForm;