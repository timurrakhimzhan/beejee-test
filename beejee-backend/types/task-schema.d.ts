import { Task } from '@prisma/client';

type TaskSortField = 'id' | 'username' | 'email' | 'status';
type TaskSortDirection= 'asc' | 'desc';

type GetTasksCountResponse = {
    total_task_count: number,
}

type GetTasksQuery = {
    sort_field?: TaskSortField,
    sort_direction?: TaskSortDirection,
    page?: number
}

type GetTasksResponse = {
    tasks: Array<Omit<Task, 'status'> & {status: TaskStatusNumber}>,
    total_task_count: number,
}

type CreateTaskBody = {
    username: string;
    email: string;
    text: string;
}

type CreateTaskResponse = Omit<Task, 'status'> & {status: TaskStatusNumber} ;

type TaskStatusNumber = 0 | 1 | 10 | 11;

type EditTaskBody = {
    text: string;
    status: 1 | 0;
}

type EditTaskParam = {
    id: number
}

type EditTaskReply = Omit<Task, 'status'> & {status: TaskStatusNumber};