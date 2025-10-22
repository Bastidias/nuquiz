/**
 * Application Error Handling
 *
 * Simple, pragmatic error class for HTTP errors.
 * Replaces verbose error hierarchy with one flexible class.
 */

/**
 * Application error with HTTP status code and optional metadata
 *
 * @example
 * throw new AppError('Invalid email format', 400, { field: 'email' });
 * throw new AppError('Unauthorized', 401);
 * throw new AppError('User not found', 404, { userId: 123 });
 */
export class AppError extends Error {
  public readonly timestamp: Date;

  constructor(
    message: string,
    public readonly statusCode: number = 500,
    public readonly metadata?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
    this.timestamp = new Date();

    // Maintains proper stack trace (V8 only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      error: this.name,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp.toISOString(),
      ...(this.metadata && { metadata: this.metadata }),
    };
  }
}

/**
 * Convert unknown error to AppError for consistent handling
 *
 * Handles database errors (PostgreSQL error codes) and generic errors.
 *
 * @example
 * try {
 *   await someOperation();
 * } catch (err) {
 *   throw toAppError(err);
 * }
 */
export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    // Handle PostgreSQL error codes
    const code = (error as any).code;

    if (code === '23505') {
      // Unique constraint violation
      const detail = (error as any).detail || '';
      return new AppError('Duplicate entry', 409, { detail, code });
    }

    if (code === '23503') {
      // Foreign key violation
      return new AppError('Referenced record not found', 404, { code });
    }

    if (code === '23514') {
      // Check constraint violation
      return new AppError('Invalid data', 400, { code });
    }

    return new AppError(error.message, 500, { originalError: error.name });
  }

  if (typeof error === 'string') {
    return new AppError(error, 500);
  }

  return new AppError('An unknown error occurred', 500);
}
