import apiAxios from "../axios";
import methods from "./methods";
import {LS_TOKEN_KEY} from "../../constants";

const actions: ITaskActions = {
    async createTask(body) {
        const response = await apiAxios.post(methods.createTask, body);
        return response.data;
    },
    async getTasks(query) {
        const response = await apiAxios.get(methods.getTasks, { params: query});
        return response.data;
    },
    async getTasksCount() {
        const response = await apiAxios.get(methods.getTasksCount);
        return response.data;
    },
    async editTask(id, body) {
        const token = localStorage.getItem(LS_TOKEN_KEY);
        const response = await apiAxios.post(methods.editTask(id), body, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    },
};

export default actions;