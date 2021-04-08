const methods: ITaskMethods = {
    createTask: '/create',
    getTasks: '/',
    getTasksCount: '/count',
    editTask: (id: number) => '/edit/' + id
}

export default methods;