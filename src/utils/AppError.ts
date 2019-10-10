export type AppErrorLevel = 'app' | 'db' | 'api' | 'service' | 'middleware';

export default class AppError extends Error {
  constructor(readonly code: string, readonly level: AppErrorLevel = 'app') {
    super();
  }
}
