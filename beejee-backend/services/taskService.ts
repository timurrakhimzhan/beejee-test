import {TaskSortDirection, TaskSortField, TaskStatusNumber} from "../types/task-schema";
import {Prisma} from '@prisma/client';
import * as taskRepository from './../repositories/taskRepository';
import {statusEnumToNumber, statusNumberToEnum} from "../dictionaries/status-dictionary";

export const getTasks = async (sortField?: TaskSortField, sortDirection?: TaskSortDirection, page?: number) => {
    const tasks = await taskRepository.getTasks(sortField, sortDirection, page);
    return tasks.map(task => ({
        ...task,
        status: statusEnumToNumber[task.status]
    }))
}

export const getTasksCount = async () => {
    return taskRepository.getTasksCount();
}

export const createTask = async (data: Prisma.TaskUncheckedCreateInput) => {
    const task = await taskRepository.createTask(data);
    return {
        ...task,
        status: statusEnumToNumber[task.status]
    }
}

export const editTask = async (id: number, data: Prisma.TaskUpdateInput, statusNumber: TaskStatusNumber) => {
    const task = await taskRepository.editTask(id, {...data, status: statusNumberToEnum[statusNumber]});
    return {
        ...task,
        status: statusEnumToNumber[task.status]
    }
}

