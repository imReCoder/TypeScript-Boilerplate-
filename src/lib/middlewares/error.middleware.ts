import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';
import { HttpException } from '../exceptions/HttpException';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

process.on('uncaughtException', (error: Error) => {
  logger.error(`UncaughtException: ${error}`);
});

process.on('unhandledRejection', (error: Error) => {
  logger.error(`UnhandledRejection: ${error}`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully');
  process.exit(0);
});

export default errorMiddleware;
