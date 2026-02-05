/**
 * Production-safe logger utility
 * Logs are shown in development, errors always shown
 */

const isDevelopment = import.meta.env.DEV;

export const logger = {
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  warn: (...args: any[]) => {
    // Show warnings in both dev and prod for debugging API issues
    console.warn(...args);
  },
  error: (...args: any[]) => {
    // Always log errors
    console.error(...args);
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
