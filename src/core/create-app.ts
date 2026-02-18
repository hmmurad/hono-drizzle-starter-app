import {OpenAPIHono} from "@hono/zod-openapi";
import {pinoLoggerMiddleware} from "@/middlewares/pino-logger.middleware";
import { requestId } from 'hono/request-id'
import {notFoundFn} from "@/core/on-not-found";
import {onErrorFn} from "@/core/on-error";
import {serveEmojiFavicon} from "stoker/middlewares";
import {AppBindings} from "@/core/core-types";
import {defaultHook} from "stoker/openapi";
import { cors } from 'hono/cors'
import { trimTrailingSlash } from "hono/trailing-slash";
import { poweredBy } from "hono/powered-by";
import { secureHeaders } from "hono/secure-headers";
import { compress } from "hono/compress";


export function createRouter() {
    return new OpenAPIHono<AppBindings>({strict:false, defaultHook})
}

export default function createApp () {
    const app = createRouter()

    app.use( '*', requestId())
    app.use( '*', pinoLoggerMiddleware())
    app.use(serveEmojiFavicon('🚀'))
    app.use(cors())
    app.use(trimTrailingSlash())
    app.use(poweredBy())
    app.use(secureHeaders())
    if (process.env.NODE_ENV === 'production') {
        app.use('*', compress())
    }
    app.notFound(notFoundFn)
    app.onError(onErrorFn())
    return app
}
