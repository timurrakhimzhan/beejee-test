import fastify, { FastifyError } from "fastify";
import {BaseSchema, ValidationError} from "yup";
import {BASE_URL, PORT} from "./configs";
import CustomErrorSerializer from "./utils/CustomErrorSerializer";
import routes from "./routes";
import {CustomRouteGeneric} from "./types/controller";
import CustomErrorObj from "./utils/CustomError";

let fastifyApp = fastify({logger: false});

fastifyApp.register(routes, {prefix: BASE_URL})

fastifyApp.setValidatorCompiler(({schema}: {schema: BaseSchema}) => {
    return (data) => {
        try {
            const result = schema.validateSync(data, {abortEarly: false});
            return { value: result }
        } catch (e) {
            const error = e as ValidationError;
            const errorObj = error.inner.reduce<{[key: string]: string}>((accum, err) => {
                if(err.path && err.errors.length) {
                    accum[err.path] = err.errors[0];
                }
                return accum;
            }, {});
            console.log(errorObj);
            return {error: new CustomErrorObj(errorObj)}
        }
    }
});

fastifyApp.addHook<CustomRouteGeneric>('onRequest', async(req, res) => {
    const {developer} = req.query;
    if(!developer) {
        res.code(401);
        throw new Error("Не передано имя разработчика");
    }
})

fastifyApp.addHook('preSerialization', async (request, response, payload) => {
    if(response.statusCode >= 200 && response.statusCode < 300) {
        return payload ? {
            status: 'ok',
            message: payload
        } : {status: 'ok'};
    }
    let message: unknown;
    if(payload instanceof CustomErrorSerializer) {
        message = payload.error instanceof Error ? payload.error.message : payload.error;
    } else {
        message = payload;
    }
    return message ? {
        status: 'error',
        message: message
    } : {status: 'error'};
});

fastifyApp.setErrorHandler<FastifyError>((async (error: FastifyError) => {
    return new CustomErrorSerializer(error);
}))

export default async function startApp() {
    try {
        await fastifyApp.listen(PORT, '0.0.0.0');
        console.log('Listening on', PORT)
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

