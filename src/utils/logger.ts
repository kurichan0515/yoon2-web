const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  log: (...args: unknown[]) => { if (isDevelopment) console.log('[LOG]', ...args); },
  error: (...args: unknown[]) => { console.error('[ERROR]', ...args); },
  warn: (...args: unknown[]) => { if (isDevelopment) console.warn('[WARN]', ...args); },
  debug: (...args: unknown[]) => { if (isDevelopment) console.debug('[DEBUG]', ...args); },
  info: (...args: unknown[]) => { if (isDevelopment) console.info('[INFO]', ...args); },
};

export default logger;
