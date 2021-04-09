import {CustomRouteGeneric} from "./types/controller";
import {
    CreateTaskBody,
    CreateTaskResponse, EditTaskBody, EditTaskParam,
    GetTasksCountResponse,
    GetTasksQuery,
    GetTasksResponse
} from "./types/task-schema";
import * as taskSchema from "./route-schema/task-schema";
import * as taskController from "./controller/taskController";
import * as authController from "./controller/authController";
import {LoginBody, LoginResponse} from "./types/auth-schema";
import * as authSchema from "./route-schema/auth-schema";
import {FastifyPluginCallback} from "fastify";

const routes: FastifyPluginCallback = async (app, opts, next) => {
    app.route<CustomRouteGeneric<{Querystring: GetTasksQuery, Reply: GetTasksResponse}>>({
        method: 'GET',
        url: '/',
        schema: taskSchema.getTasksSchema,
        handler: taskController.getTasks
    });

    app.route<CustomRouteGeneric<{Reply: GetTasksCountResponse}>>({
        method: 'GET',
        url: '/count',
        schema: taskSchema.getTasksSchema,
        handler: taskController.getTasksCount
    });

    app.route<CustomRouteGeneric<{Body: CreateTaskBody, Reply: CreateTaskResponse}>>({
        method: 'POST',
        url: '/create',
        schema: taskSchema.createTaskSchema,
        handler: taskController.createTask
    });

    app.route<CustomRouteGeneric<{Body: EditTaskBody, Reply: null, Params: EditTaskParam}>>({
        method: 'POST',
        url: '/edit/:id',
        preHandler: authController.validateToken,
        schema: taskSchema.editTaskSchema,
        handler: taskController.editTask
    });

    app.route<CustomRouteGeneric<{Body: LoginBody, Reply: LoginResponse}>>({
        method: 'POST',
        url: '/login',
        schema: authSchema.loginSchema,
        handler: authController.login
    });
}

export default routes;