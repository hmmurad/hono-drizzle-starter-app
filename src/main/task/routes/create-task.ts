import {createRoute, z} from "@hono/zod-openapi";
import {AppRouteHandler} from "@/core/core-types";
import {OK} from "stoker/http-status-codes";
import {jsonContent} from "stoker/openapi/helpers";

export const createTaskRoute = createRoute({
    path: '/v1/task',
    method: 'post',
    tags: ['Task'],
    request: {},
    responses: {
        [OK] : jsonContent(z.object({
            message: z.string(),
        }), 'Task details')
    }
})

export const createTaskHandler : AppRouteHandler<typeof createTaskRoute> = async (c) => {
    console.log('creating task')
    return c.json({
        message: 'Hellooooooooooooo'
    }, OK)
}