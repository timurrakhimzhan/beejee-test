import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 100vw;
  height: ${({open}: {open: boolean}) => open ? `100vh` : `0`};
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal-content {
    transform: ${({open}: {open: boolean}) => open ? `scale(1)` : `scale(0)`};
    transition: all ease-out 0.2s;
    position: relative;
    padding: 24px;
    background: white;
    border-radius: 10px;
    #close-icon {
      position: absolute;
      top:5px;
      right: 5px;
      width: 20px;
      cursor: pointer;
    }
  }
`;
