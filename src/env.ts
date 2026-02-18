import {config} from 'dotenv'
import {expand} from 'dotenv-expand'
import * as path from "node:path";
import {z, ZodError} from "zod";

expand(config())

const EnvSchema = z.object({
    NODE_ENV: z.string().default("development"),
    PORT: z.coerce.number().default(5000),
    LOG_LEVEL: z.enum(["info", "warn", "error", "debug", "verbose", "fatal"]),
    DB_URL: z.string().default(""),
})

export type TEnv = z.infer<typeof EnvSchema>
let env: TEnv

try{
    env = EnvSchema.parse(process.env)

}
catch(error){
    const err = error as ZodError
    console.error('❌Invalid env:')

    const fieldErrors: Record<string, string[]> = {}

    for (const issue of err.issues) {
        const path = issue.path.join('.') || 'root'
        fieldErrors[path] ??= []
        fieldErrors[path].push(issue.message)
    }

    console.error(fieldErrors)
    process.exit(1)
}



export default env