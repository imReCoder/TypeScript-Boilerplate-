import { Router } from 'express';
import cors from 'cors';
import { configCors, rateLimitConfig } from '../../config';
import rateLimit from 'express-rate-limit';

export const allowCors = (router: Router) => {
  router.use(
    cors({
      origin(origin, callback) {
        if (!origin) {
          return callback(null, true);
        }
        if (configCors.allowOrigin.indexOf(origin) === -1) {
          const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
      exposedHeaders: configCors.exposedHeaders,
      // To enable HTTP cookies over CORS
      // credentials: true,
    }),
  );
};

export const requestLimiter = (router: Router, rateLimitConfig) => {
  const limiter = rateLimit({
    windowMs: +rateLimitConfig.inTime, // 1 minutes
    max: +rateLimitConfig.maxRequest, // limit each IP to 12 requests per windowMs,
    message: {
      status: 0,
      error: 'Too Many Requests',
      statusCode: 429,
      message: 'Oh boy! You look in hurry, take it easy',
      description: 'You have crossed maximum number of requests. please wait and try again.',
    },
  });
  router.use(limiter);
};
