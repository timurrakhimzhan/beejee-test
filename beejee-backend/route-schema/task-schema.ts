import {FastifySchema} from "fastify";
import {TaskSortDirection, TaskSortField} from "../types/task-schema";
import * as yup from 'yup';

const sortFields: Array<TaskSortField> = ['id', 'username', 'email', 'status'];
const sortDirections: Array<TaskSortDirection> = ['asc', 'desc'];

export const getTasksSchema: FastifySchema = {
    querystring: yup.object({
        sort_field: yup.string().oneOf(sortFields, 'sort_field должен быть одним из следующих значений: id, username, email, status'),
        sort_direction: yup.string().oneOf(sortDirections, 'sort_direction должен быть одним из следующих значений: asc, desc'),
        page: yup.number()
    }),
}

export const createTaskSchema: FastifySchema = {
    body: yup.object({
        username: yup.string().required('Поле является обязательным для заполнения'),
        email: yup.string().email('Неверный email').required('Поле является обязательным для заполнения'),
        text: yup.string().required('Поле является обязательным для заполнения'),
    }),
}

export const editTaskSchema: FastifySchema = {
    body: yup.object({
        text: yup.string().required('Поле является обязательным для заполнения'),
        status: yup.number().oneOf([1, 0], 'status должен быть одним из следующих значений: 1, 1').required('Поле является обязательным для заполнения')
    }),
    params: yup.object({
        id: yup.number().required('Не предоставлен id'),
    })
};

