export const logger = {
  info: (message: string, data?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'production') {
      console.log(JSON.stringify({ level: 'info', message, ...data, timestamp: new Date().toISOString() }));
    } else {
      console.log(`[INFO] ${message}`, data || '');
    }
  },
  error: (message: string, error?: unknown, data?: Record<string, unknown>) => {
    console.error(JSON.stringify({
      level: 'error',
      message,
      error: error instanceof Error ? { name: error.name, message: error.message, stack: error.stack } : error,
      ...data,
      timestamp: new Date().toISOString()
    }));
  },
  warn: (message: string, data?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'production') {
      console.warn(JSON.stringify({ level: 'warn', message, ...data, timestamp: new Date().toISOString() }));
    } else {
      console.warn(`[WARN] ${message}`, data || '');
    }
  },
};

export function validateEnvironment(requiredVars: string[]): string[] {
  return requiredVars.filter(v => !process.env[v]);
}

export function measurePerformance<T>(name: string, fn: () => T): T {
  const start = performance.now();
  const result = fn();
  const duration = performance.now() - start;
  logger.info(`Performance: ${name}`, { duration: `${duration.toFixed(2)}ms` });
  return result;
}
