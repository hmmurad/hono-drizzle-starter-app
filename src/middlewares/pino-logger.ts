import pino from 'pino'

const transport = pino.transport({
    target: 'pino-pretty'
})

export const pinoLogger= pino({
    level: process.env.PINO_LOG_LEVEL || 'info',
    name: 'pino-logger',
    formatters: {
        level: (label) => {
            return { level: label.toUpperCase() };
        },
    },

}, transport)

