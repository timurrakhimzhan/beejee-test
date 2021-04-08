type TaskStatus = 0 | 1 | 10 | 11;

type Task = {
    id: number;
    username: string;
    email: string;
    text: string;
    status: TaskStatus;
}

type TaskSortDirection = 'asc' | 'desc';
type TaskSortField = 'id' | 'username' | 'email' | 'status';

interface ITaskApi {
    createTask: any;
    getTasks: any;
    getTasksCount: any;
    editTask: any;
}

interface ITaskMethods extends ITaskApi{
    createTask: string;
    getTasks: string;
    getTasksCount: string;
    editTask: (id: number) => string;
}

type CreateTaskRequestBody = {
    username: string;
    email: string;
    text: string;
}

type CreateTaskResponse = Task;

type GetTasksRequestQuery = {
    sort_field?: TaskSortField,
    sort_direction?: TaskSortDirection,
    page?: number;
}

type GetTasksResponse = {
    tasks: Array<Task>,
    total_task_count: number,
}

type GetTasksCountResponse = {
    total_task_count: number,
}

type EditTaskRequestBody = {
    text: string;
    status: 10 | 11;
}

type EditTaskResponse = null;

interface ITaskActions extends ITaskApi {
    createTask: (body: CreateTaskRequestBody) => Promise<CustomResponse<CreateTaskResponse>>,
    getTasks: (query?: GetTasksRequestQuery) => Promise<CustomResponse<GetTasksResponse>>
    getTasksCount: () => Promise<CustomResponse<GetTasksCountResponse>>;
    editTask: (id: number, body: EditTaskRequestBody) => Promise<CustomResponse<EditTaskResponse>>
}