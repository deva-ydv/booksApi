import {config as conf} from 'dotenv'
conf()

const _config = {
    port: process.env.PORT,
}

export const config = Object.freeze(_config) // freeze helps in read-only so one can over-write