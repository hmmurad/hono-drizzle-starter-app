import {createRouter} from "@/core/create-app";
import {createTaskHandler, createTaskRoute} from "@/main/task/routes/create-task";

export const taskRoute = createRouter()
    .openapi(
        createTaskRoute, createTaskHandler
    )



