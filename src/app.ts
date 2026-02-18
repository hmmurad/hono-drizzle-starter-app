import createApp from "@/core/create-app";
import {taskRoute} from "@/main/task/task.route";
import configureOpenAPI from "@/core/configure-open-api";

const app = createApp();

const routes = [
    taskRoute,
]

configureOpenAPI(app)

for (const route of routes) {
    app.route('/', route)
}

export default app