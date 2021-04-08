import axios from 'axios';

const apiAxios = axios.create({
    baseURL: 'api/~shapoval/test-task-backend/v2',
});

export default apiAxios;