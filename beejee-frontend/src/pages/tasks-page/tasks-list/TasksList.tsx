import React from "react"
import { TasksListWrapper } from "./styled-components"
import TaskItem from "./task-item";
import {useSnapshot} from "valtio";
import store from "../../../store";
import Pagination from "../../../shared/pagination";
import Space from "../../../shared/space";

const TasksList = () => {
    const snap = useSnapshot(store);
    const {displayTasksIds, idTaskMap, totalPages, currentPage} = snap.tasks;
    return <TasksListWrapper>
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Имя пользователя</th>
                <th>Email</th>
                <th>Текст</th>
                <th>Статус</th>
            </tr>
            </thead>
            <tbody>
            {
                displayTasksIds.map((id) => <TaskItem key={id} {...idTaskMap[id]}/>)
            }
            </tbody>
        </table>
        <Space height={'24px'} />
        <Pagination totalPages={totalPages} onPageClick={(page) => store.tasks.setPage(page)} currentPage={currentPage} />
    </TasksListWrapper>
}

export default TasksList;