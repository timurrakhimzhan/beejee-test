import axios from 'axios';

const apiAxios = axios.create({
    baseURL: '/~shapoval/test-task-backend/v2',
});

export default apiAxios;