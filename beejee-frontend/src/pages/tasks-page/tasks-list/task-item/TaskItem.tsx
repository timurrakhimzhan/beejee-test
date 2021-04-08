import React from "react";
import Space from "../../../../shared/space";
import {StatusStateCell, StatusStateWrapper, Cell, Row} from "./styled-components";
import store from "../../../../store";

const TaskItem: React.FC<Task> = ({id, username, email, text, status}) => {
    return <Row>
        <Cell>{id}</Cell>
        <Cell>{username}</Cell>
        <Cell>{email}</Cell>
        <Cell>{text}</Cell>
        <StatusStateCell>
            <StatusStateWrapper>
                <label>Выполнено</label>
                <Space width={'2px'}/>
                <input type={'checkbox'} checked={status === 1 || status === 11} readOnly />
            </StatusStateWrapper>
            <Space width={'20px'}/>
            <StatusStateWrapper>
                <label>Отредактировано администратором</label>
                <Space width={'2px'}/>
                <input type={'checkbox'} checked={status === 10 || status === 11} readOnly />
            </StatusStateWrapper>
            <Space width={'24px'}/>
            <img alt={'edit'} src={'edit-icon.svg'} onClick={() => store.tasks.setEditingTaskId(id)} />
        </StatusStateCell>
    </Row>
}

export default TaskItem