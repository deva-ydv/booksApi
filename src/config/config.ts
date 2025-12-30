import { config as conf } from "dotenv";
conf();

const requiredEnv = [
  "PORT",
  "MONGO_URL",
  "JWT_SECRET",
  "CLOUD_NAME",
  "CLOUD_API_KEY",
  "CLOUD_API_SECRET",
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing env variable: ${key}`);
  }
}

const _config = {
  port: Number(process.env.PORT),
  databaseUrl: process.env.MONGO_URL!,
  env: process.env.NODE_ENV || "development", // for errorStack in app.ts folder
  jwtSecret: process.env.JWT_SECRET!,
  cloudinaryCloud: process.env.CLOUD_NAME!,
  cloudinaryApiKey: process.env.CLOUD_API_KEY!,
  cloudinarySecret: process.env.CLOUD_API_SECRET!,
};

export const config = Object.freeze(_config); // freeze helps in read-only so one can over-write
