import {config as conf} from 'dotenv'
conf()

const _config = {
    port: process.env.PORT,
    databaseUrl: process.env.MONGO_URL,
    env: process.env.NODE_ENV, // for errorStack in app.ts folder
    jwtSecret: process.env.JWT_SECRET,
    cloudinaryCloud: process.env.CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUD_API_KEY,
    cloudinarySecret: process.env.CLOUD_API_SECRET,
}

export const config = Object.freeze(_config) // freeze helps in read-only so one can over-write