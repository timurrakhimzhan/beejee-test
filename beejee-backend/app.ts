import fastify, { FastifyError } from "fastify";
import { Task } from '@prisma/client';
import * as taskSchema from './route-schema/task-schema';
import * as taskController from './controller/taskController';
import * as authSchema from './route-schema/auth-schema';
import * as authController from './controller/authController';
import {
    CreateTaskBody,
    CreateTaskResponse,
    EditTaskBody,
    EditTaskParam,
    GetTasksResponse,
    GetTasksQuery, GetTasksCountResponse
} from "./types/task-schema";
import {BaseSchema} from "yup";
import {LoginBody, LoginResponse} from "./types/auth-schema";
import {BASE_URL, PORT} from "./config";
import CustomError from "./utils/CustomError";

const fastifyApp = fastify({logger: false});

fastifyApp.register((app, opts, next) => {
    app.route<{Querystring: GetTasksQuery, Reply: GetTasksResponse}>({
        method: 'GET',
        url: '/',
        schema: taskSchema.getTasksSchema,
        handler: taskController.getTasks
    });

    app.route<{Reply: GetTasksCountResponse}>({
        method: 'GET',
        url: '/count',
        schema: taskSchema.getTasksSchema,
        handler: taskController.getTasksCount
    });

    app.route<{Body: CreateTaskBody, Reply: CreateTaskResponse}>({
        method: 'POST',
        url: '/create',
        schema: taskSchema.createTaskSchema,
        handler: taskController.createTask
    });

    app.route<{Body: EditTaskBody, Reply: null, Params: EditTaskParam}>({
        method: 'POST',
        url: '/edit/:id',
        preHandler: authController.validateToken,
        schema: taskSchema.editTaskSchema,
        handler: taskController.editTask
    });

    app.route<{Body: LoginBody, Reply: LoginResponse}>({
        method: 'POST',
        url: '/login',
        schema: authSchema.loginSchema,
        handler: authController.login
    });
    next()
}, {prefix: BASE_URL})

fastifyApp.setValidatorCompiler(({schema}: {schema: BaseSchema}) => {
    return (data) => {
        try {
            const result = schema.validateSync(data, {abortEarly: false});
            return { value: result }
        } catch (e) {
            return { error: new Error(e.errors.join(", ")) }
        }
    }
});

fastifyApp.addHook('preSerialization', async (request, response, payload) => {
    if(response.statusCode >= 200 && response.statusCode < 300) {
        return payload ? {
            status: 'ok',
            message: payload
        } : {status: 'ok'};
    }
    let message: unknown | undefined;
    if(payload instanceof CustomError) {
        message = payload.message || payload.payload
    } else {
        message = payload;
    }
    return message ? {
        status: 'error',
        message: message
    } : {status: 'error'};
});

fastifyApp.setErrorHandler<FastifyError>((async (error: FastifyError) => {
    console.log(error);
    if(error instanceof CustomError) {
        return error;
    }
    if(error instanceof Error) {
        return new CustomError(error.message);
    }
    return new CustomError(error);
}))

export default async function startApp() {
    try {
        await fastifyApp.listen(PORT, '0.0.0.0');
        console.log('Listening on', PORT)
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

