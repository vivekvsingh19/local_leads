/**
 * Production-safe logger utility
 * Only logs in development mode, silent in production
 */

const isDevelopment = import.meta.env.DEV;

export const logger = {
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  warn: (...args: any[]) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
  error: (...args: any[]) => {
    // Always log errors, but in production you could send to error tracking service
    if (isDevelopment) {
      console.error(...args);
    } else {
      // In production, you could send to Sentry or similar
      // For now, still log errors but could be enhanced
      console.error(...args);
    }
  },
  info: (...args: any[]) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
  debug: (...args: any[]) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },
};

export default logger;
