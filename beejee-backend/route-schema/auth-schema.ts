import {FastifySchema} from "fastify";
import * as yup from 'yup';

export const loginSchema: FastifySchema = {
    body: yup.object({
        username: yup.string().required('Поле является обязательным для заполнения'),
        password: yup.string().required('Поле является обязательным для заполнения')
    }),
}