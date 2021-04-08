import React from "react";
import Modal from "../../../shared/modal";
import EditTaskForm from "./edit-task-form";

type Props = {
    open: boolean;
    onClose: () => void;
}

const EditTaskModal: React.FC<Props> = ({open, onClose}) => {
    return <Modal open={open} onClose={onClose}>
        <EditTaskForm onClose={onClose} />
    </Modal>
}

export default EditTaskModal;