export class ErrorLogger {
  static log(error: Error, context?: string) {
    console.error(`[${context || 'Error'}]:`, error);

    // 프로덕션에서는 외부 서비스로 전송 (예: Sentry)
    if (import.meta.env.PROD) {
      // TODO: Send to error tracking service
      // Sentry.captureException(error);
    }
  }

  static logWarning(message: string, data?: any) {
    console.warn(message, data);

    if (import.meta.env.PROD) {
      // TODO: Send warning to tracking service
    }
  }

  static logInfo(message: string, data?: any) {
    if (import.meta.env.DEV) {
      console.log(message, data);
    }
  }
}