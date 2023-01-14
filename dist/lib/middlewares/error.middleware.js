"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../utils/logger");
const errorMiddleware = (error, req, res, next) => {
    try {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        logger_1.logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
        res.status(status).json({ message });
    }
    catch (error) {
        next(error);
    }
};
process.on('uncaughtException', (error) => {
    logger_1.logger.error(`UncaughtException: ${error}`);
});
process.on('unhandledRejection', (error) => {
    logger_1.logger.error(`UnhandledRejection: ${error}`);
});
process.on('SIGTERM', () => {
    logger_1.logger.info('SIGTERM received. Shutting down gracefully');
    process.exit(0);
});
process.on('SIGINT', () => {
    logger_1.logger.info('SIGINT received. Shutting down gracefully');
    process.exit(0);
});
exports.default = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map