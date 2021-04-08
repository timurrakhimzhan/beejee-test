import {FastifySchema} from "fastify";
import {TaskSortDirection, TaskSortField} from "../types/task-schema";
import * as yup from 'yup';
import {statusNumbers} from "../dictionaries/status-dictionary";

const sortFields: Array<TaskSortField> = ['id', 'username', 'email', 'status'];
const sortDirections: Array<TaskSortDirection> = ['asc', 'desc'];

export const getTasksSchema: FastifySchema = {
    querystring: yup.object({
        sort_field: yup.string().oneOf(sortFields),
        sort_direction: yup.string().oneOf(sortDirections),
        page: yup.number()
    }),
}

export const createTaskSchema: FastifySchema = {
    body: yup.object({
        username: yup.string().required(),
        email: yup.string().email().required(),
        text: yup.string().required(),
    }),
}

export const editTaskSchema: FastifySchema = {
    body: yup.object({
        text: yup.string(),
        status: yup.number().oneOf([10, 11])
    }),
    params: yup.object({
        id: yup.number().required(),
    })
};

