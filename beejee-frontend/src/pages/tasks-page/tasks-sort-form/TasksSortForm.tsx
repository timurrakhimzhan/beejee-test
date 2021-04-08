import React, {ChangeEvent} from "react";
import { TasksSortFormWrapper } from "./styled-components";
import Space from "../../../shared/space";
import store from "../../../store";
import {useSnapshot} from "valtio";

const TasksSortForm = () => {
    const snap = useSnapshot(store);
    const {sortField, sortDirection} = snap.tasks;
    const onChangeDirection = (event: ChangeEvent<HTMLSelectElement>) => {
        const sortDirection: TaskSortDirection = event.target.value as TaskSortDirection;
        store.tasks.setSortDirection(sortDirection);
    }

    const onChangeField = (event: ChangeEvent<HTMLSelectElement>) => {
        const sortField: TaskSortField = event.target.value as TaskSortField;
        store.tasks.setSortField(sortField);
    }

    return <TasksSortFormWrapper>
        <label>
            Сортировать по:
        </label>
        <Space width={'18px'}  />
        <select onChange={onChangeDirection} value={sortDirection}>
            <option value={'asc'}>Возрастанию</option>
            <option value={'desc'}>Убыванию</option>
        </select>
        <Space width={'18px'} />
        <select onChange={onChangeField} value={sortField}>
            <option value={'id'}>ID</option>
            <option value={'username'}>Имени пользователя</option>
            <option value={'email'}>Почты</option>
            <option value={'status'}>Статуса</option>
        </select>
    </TasksSortFormWrapper>
}

export default TasksSortForm;