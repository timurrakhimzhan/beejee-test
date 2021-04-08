import {CustomRouteHandler} from "../types/controller";
import prisma from "../prisma";
import {
    CreateTaskBody,
    CreateTaskResponse,
    EditTaskBody,
    EditTaskParam,
    GetTasksResponse,
    GetTasksQuery, GetTasksCountResponse
} from "../types/task-schema";
import * as taskService from "./../services/taskService";

export const getTasks: CustomRouteHandler<{Querystring: GetTasksQuery, Reply: GetTasksResponse}> = async (req) => {
    const {sort_direction: sortDirection, sort_field: sortField, page} = req.query;
    const tasks = await taskService.getTasks(sortField, sortDirection, page);
    return {tasks, total_task_count: tasks.length};
}

export const getTasksCount: CustomRouteHandler<{Reply: GetTasksCountResponse}> = async (req) => {
    const taskCount = await taskService.getTasksCount();
    return { total_task_count: taskCount }
}

export const createTask: CustomRouteHandler<{Body: CreateTaskBody, Reply: CreateTaskResponse}> = async(req) => {
    const {username, email, text} = req.body;
    return await taskService.createTask({username, email, text});
}

export const editTask: CustomRouteHandler<{Body: EditTaskBody, Params: EditTaskParam, Reply: null}> = async(req) => {
    const { id } = req.params;
    const { text, status } = req.body;
    await taskService.editTask(id, {text}, status);
    return null;
}