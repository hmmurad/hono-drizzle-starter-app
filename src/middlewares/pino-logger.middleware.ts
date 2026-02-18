import type { MiddlewareHandler, HonoRequest } from 'hono'
import { HTTPException } from 'hono/http-exception'
import {pinoLogger} from "@/middlewares/pino-logger";

/* ---------------- SAFE BODY PARSER ---------------- */
async function safeJson(req: HonoRequest) {
    try {
        const text = await req.raw.clone().text()

        if (!text) return undefined
        if (text.length > 10_000) return '[BODY TOO LARGE]'

        return JSON.parse(text)
    } catch {
        return undefined
    }
}

/* ---------------- PINO MIDDLEWARE ---------------- */
export const pinoLoggerMiddleware = (): MiddlewareHandler => {
    return async (c, next) => {
        const start = Date.now()

        const childLogger = pinoLogger.child({
            requestId: c.var.requestId,
            req: {
                method: c.req.method,
                path: c.req.path,
                query: c.req.query(),
                // headers: c.req.header(),
                body: c.req.method !== 'GET'
                    ? await safeJson(c.req)
                    : undefined,
            },
        })

        // attach logger to context
        c.set('logger', childLogger)

        // 🔵 REQUEST LOG
        childLogger.info('Incoming request')

        try {
            await next()

            // 🟢 RESPONSE LOG
            childLogger.info(
                {
                    res: {
                        status: c.res.status,
                        durationMs: Date.now() - start,
                    },
                },
                'Request completed'
            )
        } catch (err) {
            if (err instanceof HTTPException) {
                childLogger.warn(
                    {
                        res: { status: err.status },
                        error: err.message,
                    },
                    'HTTP error'
                )
                throw err
            }

            // 🔴 UNHANDLED ERROR
            childLogger.error(
                {
                    res: { status: 500 },
                    err,
                },
                'Unhandled server error'
            )

            throw err
        }
    }
}
