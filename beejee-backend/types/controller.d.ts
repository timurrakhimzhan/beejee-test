import {preHandlerHookHandler, RouteHandlerMethod} from "fastify";
import {IncomingMessage, Server, ServerResponse} from "http";
import {RouteGenericInterface} from "fastify/types/route";

export type CustomRouteHandler<T = RouteGenericInterface> =
    RouteHandlerMethod<Server, IncomingMessage, ServerResponse, T, unknown>;

export type CustomPreHandler<T = RouteGenericInterface> = preHandlerHookHandler<Server, IncomingMessage, ServerResponse, T>;