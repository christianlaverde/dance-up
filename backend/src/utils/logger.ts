import { pino } from 'pino';
import { pinoHttp } from 'pino-http';

// Create a base logger for general-purpose logging
const baseLogger = pino({
  level: process.env.LOG_LEVEL || 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
});

/**
 * HTTP Logger middleware using pino-http.
 *
 * This middleware logs incoming HTTP requests and responses in a concise format,
 * filtering out extraneous details while keeping key information (e.g., method, url, status code).
 */
export const httpLogger = pinoHttp({
  logger: baseLogger,
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      // Log only the user-agent header for clarity
      headers: { 'user-agent': req.headers['user-agent'] },
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
});

// Export the base logger so that it can be used elsewhere in your codebase
export default baseLogger;
