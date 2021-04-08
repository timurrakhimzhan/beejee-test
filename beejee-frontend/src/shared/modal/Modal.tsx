import React from "react"
import { ModalWrapper } from "./styled-components"

type Props = {
    open: boolean;
    onClose: () => void;
}

const Modal: React.FC<Props> = ({open, onClose, children}) => {
    return <ModalWrapper open={open} onClick={() => onClose()}>
        <div id={'modal-content'} onClick={(e) => e.stopPropagation()}>
            <img onClick={onClose} id={'close-icon'} alt={'close'} src={'close-icon.svg'} />
            {children}
        </div>
    </ModalWrapper>
}

export default Modal;