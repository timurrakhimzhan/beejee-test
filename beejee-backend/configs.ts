import dotenv from 'dotenv';
dotenv.config();

export const TASKS_PER_PAGE = 5;
export const PORT = process.env['PORT'] || 9090;
export const JWT_SECRET = process.env['JWT_SECRET'] || '';
export const BASE_URL = '/~shapoval/test-task-backend/v2';