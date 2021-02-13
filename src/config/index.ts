import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("Couldn't find .env file");
}

export default {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT,
  host: process.env.HOST,
  pathPrefix: process.env.PATHPREFIX,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: '/api',
    timeout: +process.env.API_TIMEOUT_MS,
  },
};
