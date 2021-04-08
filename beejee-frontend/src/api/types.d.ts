type CustomResponse<T extends {} = {}> = {
    status: 'ok' | 'error',
    message: T
};

type ApiItem<A extends {} = {}, M extends {} = {}> = {
    actions: A;
    methods: M;
}