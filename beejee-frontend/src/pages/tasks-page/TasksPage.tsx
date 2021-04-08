import React, {useState} from "react";
import { TasksPageWrapper } from "./styled-components";
import CustomButton from "../../shared/custom-button";
import CreateTaskModal from "./create-task-modal";
import Space from "../../shared/space";
import TasksList from "./tasks-list";
import {useQuery} from "react-query";
import API from "../../api";
import store from "../../store";
import {API_TASKS, API_TASKS_COUNT} from "../../constants";
import Loader from "../../shared/loader";
import {sleep} from "../../utils";
import {useSnapshot} from "valtio";
import TasksSortForm from "./tasks-sort-form";
import EditTaskModal from "./edit-task-modal";

const TasksPage = () => {
    const [createTaskModalOpened, setCreateTaskModalOpened] = useState(false);
    const snap = useSnapshot(store);
    const {isLoadingTasks, currentPage, sortDirection, sortField, editingTaskId} = snap.tasks;

    useQuery([API_TASKS, { currentPage, sortDirection, sortField}], async () => {
        store.tasks.setIsLoadingTasks(true);
        try {
            const response = await API.task.actions.getTasks({
                page: currentPage,
                sort_field: sortField,
                sort_direction: sortDirection
            });
            await sleep(300);
            const tasks = response.message.tasks;
            const tasksIds = tasks.map((task) => task.id);
            tasks.forEach((task) => store.tasks.addTask(task));
            store.tasks.setDisplayTasksIds(tasksIds);
        } catch(err) {

        }finally {
            store.tasks.setIsLoadingTasks(false);
        }
    }, {refetchOnWindowFocus: false});
    useQuery(API_TASKS_COUNT, async () => {
        const response = await API.task.actions.getTasksCount();
        store.tasks.setTotalTaskCount(response.message.total_task_count);
    }, {refetchOnWindowFocus: false});

    return <TasksPageWrapper>
        <div className={'content'}>
            <div className={'row'}>
                <CustomButton onClick={() => setCreateTaskModalOpened(true)} className={'create-task-button'}>
                     Создать задачу
                </CustomButton>
                <TasksSortForm />
            </div>
            <Space height={'24px'}/>
            <div className={'row'}>
                <Loader isLoading={isLoadingTasks}>
                    <TasksList />
                </Loader>
            </div>
        </div>
        <CreateTaskModal open={createTaskModalOpened} onClose={() => setCreateTaskModalOpened(false)} />
        <EditTaskModal open={!!editingTaskId} onClose={() => store.tasks.disableEditing()} />
    </TasksPageWrapper>
}

export default TasksPage;