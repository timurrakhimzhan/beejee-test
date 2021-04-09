import {TaskSortDirection, TaskSortField} from "../types/task-schema";
import prisma from "../prisma";
import {TASKS_PER_PAGE} from "../configs";
import { Prisma } from '@prisma/client';

export const getTasks = async (sortField?: TaskSortField, sortDirection?: TaskSortDirection, page?: number) => {
    return prisma.task.findMany({
        orderBy: sortField ? [
            {
                [sortField]: sortDirection || 'desc'
            }
        ] : undefined,
        skip: page ? (page - 1) * TASKS_PER_PAGE : undefined,
        take: page ? TASKS_PER_PAGE : undefined
    });
}

export const getTasksCount = async () => {
    return prisma.task.count();
}

export const createTask = async(data: Prisma.TaskUncheckedCreateInput) => {
    return prisma.task.create({data});
}

export const editTask = async(id: number, data: Prisma.TaskUpdateInput) => {
    return prisma.task.update({
        where: {
            id
        },
        data
    });
}