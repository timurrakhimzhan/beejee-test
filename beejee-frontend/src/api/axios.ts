import axios from 'axios';

const apiAxios = axios.create({
    baseURL: 'api/~shapoval/test-task-backend/v2',
    params: {
        developer: process.env['DEVELOPER_NAME'] || 'timur'
    }
});

export default apiAxios;