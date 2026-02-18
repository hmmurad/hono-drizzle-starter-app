import {OpenAPIHono, RouteConfig, RouteHandler} from "@hono/zod-openapi";
import {TEnv} from "@/env";
import {PinoLogger} from "hono-pino";

export type AppBindings = {
    Bindings: TEnv
    Variables: {
        userId?: string
        logger: PinoLogger
    }
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
    R,
    AppBindings
>