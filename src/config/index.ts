import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const configCors = {
  // Allow your domains to restrict ill apis.
  allowOrigin: [
    'http://localhost:3000',
    //add your origin
  ],
  // Expose additional which are restricted.
  exposedHeaders: ['X-Auth'],
};

export const rateLimitConfig = {
  inTime: process.env.REQUEST_TIME || 60 * 1000,
  maxRequest: process.env.MAX_REQUEST || 60,
};

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, DB_HOST, DB_PASS, DB_CLUSTER, DB_DATABASE, DB_ACCESS, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
