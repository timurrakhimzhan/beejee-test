import apiAxios from "../axios";
import methods from "./methods";

const actions: IAuthActions = {
    async login(body) {
        const response = await apiAxios.post(methods.login, body);
        return response.data;
    }
};

export default actions;