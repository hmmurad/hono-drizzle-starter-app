import {AppOpenAPI} from "@/core/core-types";
import  packageJSON from '../../package.json'
import { Scalar } from '@scalar/hono-api-reference'

export default function configureOpenAPI(app: AppOpenAPI) {
    app.doc('/doc', {
        openapi: '3.0.0',
        info: {
            version: packageJSON.version,
            title: 'Hono App',
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    }),

// Switch the theme (or pass other options)
    app.get('/reference', Scalar({
        url: '/doc',
        theme: 'kepler',
        layout: 'classic',
        pageTitle: 'Awesome API',
        defaultHttpClient:{
            targetKey: 'js',
            clientKey: 'fetch'
        }
    }))
}