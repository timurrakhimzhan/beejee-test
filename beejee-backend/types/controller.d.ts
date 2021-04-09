import {preHandlerHookHandler, RouteHandlerMethod} from "fastify";
import {IncomingMessage, Server, ServerResponse} from "http";
import {RouteGenericInterface} from "fastify/types/route";

type CustomQueryHandler = {
    developer: string;
}

type CustomRouteGeneric<T = RouteGenericInterface> = T & {Querystring: CustomQueryHandler}

export type CustomRouteHandler<T = RouteGenericInterface> =
    RouteHandlerMethod<Server, IncomingMessage, ServerResponse, CustomRouteGeneric<T>, unknown>;

export type CustomPreHandler<T = RouteGenericInterface> = preHandlerHookHandler<Server, IncomingMessage, ServerResponse, CustomRouteGeneric<T>>;