declare module './logger.js' {
  import { Logger } from 'pino';
  const logger: Logger;
  export default logger;
}
export {};