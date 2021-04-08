interface IAuthApi {
    login: any;
}

interface IAuthMethods extends IAuthApi{
    login: string;
}

type LoginRequestBody = {
    username: string;
    password: string;
}

type LoginResponse = {
    token: string;
}

interface IAuthActions extends IAuthApi {
    login: (body: LoginRequestBody) => Promise<CustomResponse<LoginResponse>>
}