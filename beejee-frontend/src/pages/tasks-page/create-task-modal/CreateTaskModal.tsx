import React from "react";
import Modal from "../../../shared/modal";
import CreateTaskForm from "./create-task-form";

type Props = {
    open: boolean;
    onClose: () => void;
}

const CreateTaskModal: React.FC<Props> = ({open, onClose}) => {
    return <Modal open={open} onClose={onClose}>
        <CreateTaskForm onClose={onClose} />
    </Modal>
}

export default CreateTaskModal;