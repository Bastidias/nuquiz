/**
 * Typed Error Classes
 *
 * Custom error types for better error handling throughout the application.
 * Following Eric Elliott's principles:
 * - Explicit error types
 * - Descriptive error messages
 * - Error metadata for debugging
 *
 * Use these instead of generic Error() for better debugging and error handling.
 */

// ============================================================================
// Base Application Error
// ============================================================================

/**
 * Base application error class
 *
 * All custom errors extend this class.
 */
export class ApplicationError extends Error {
  public readonly statusCode: number;
  public readonly metadata?: Record<string, unknown>;
  public readonly timestamp: Date;

  constructor(
    message: string,
    statusCode: number = 500,
    metadata?: Record<string, unknown>
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.metadata = metadata;
    this.timestamp = new Date();

    // Maintains proper stack trace for where error was thrown (V8 only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Convert error to JSON for API responses
   */
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

// ============================================================================
// Validation Errors
// ============================================================================

/**
 * Validation error - thrown when input validation fails
 *
 * @example
 * throw new ValidationError('Invalid email format', {
 *   field: 'email',
 *   value: 'not-an-email',
 *   expected: 'valid email address'
 * });
 */
export class ValidationError extends ApplicationError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 400, metadata);
  }

  static invalidEmail(email: string): ValidationError {
    return new ValidationError('Invalid email format', {
      field: 'email',
      value: email,
    });
  }

  static invalidPassword(issues: string[]): ValidationError {
    return new ValidationError('Password does not meet requirements', {
      field: 'password',
      issues,
    });
  }

  static invalidUsername(username: string): ValidationError {
    return new ValidationError('Invalid username format', {
      field: 'username',
      value: username,
      requirements: '3-50 characters, alphanumeric, underscores, and hyphens only',
    });
  }

  static missingField(field: string): ValidationError {
    return new ValidationError(`Missing required field: ${field}`, {
      field,
    });
  }

  static invalidRole(role: string): ValidationError {
    return new ValidationError('Invalid user role', {
      field: 'role',
      value: role,
      allowedValues: ['student', 'admin', 'superadmin'],
    });
  }
}

// ============================================================================
// Authentication Errors
// ============================================================================

/**
 * Authentication error - thrown when authentication fails
 *
 * @example
 * throw new AuthenticationError('Invalid credentials');
 */
export class AuthenticationError extends ApplicationError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 401, metadata);
  }

  static invalidCredentials(): AuthenticationError {
    return new AuthenticationError('Invalid email or password');
  }

  static sessionExpired(): AuthenticationError {
    return new AuthenticationError('Session has expired', {
      reason: 'session_expired',
    });
  }

  static noSession(): AuthenticationError {
    return new AuthenticationError('No active session', {
      reason: 'no_session',
    });
  }

  static emailNotVerified(): AuthenticationError {
    return new AuthenticationError('Email address not verified', {
      reason: 'email_not_verified',
    });
  }

  static accountLocked(): AuthenticationError {
    return new AuthenticationError('Account has been locked', {
      reason: 'account_locked',
    });
  }
}

// ============================================================================
// Authorization Errors
// ============================================================================

/**
 * Authorization error - thrown when user lacks permission
 *
 * @example
 * throw new AuthorizationError('Insufficient permissions', {
 *   required: 'admin',
 *   actual: 'student'
 * });
 */
export class AuthorizationError extends ApplicationError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 403, metadata);
  }

  static insufficientPermissions(
    requiredRole: string | string[],
    actualRole: string
  ): AuthorizationError {
    return new AuthorizationError('Insufficient permissions', {
      required: requiredRole,
      actual: actualRole,
    });
  }

  static resourceAccessDenied(resourceType: string, resourceId: number): AuthorizationError {
    return new AuthorizationError('Access denied to resource', {
      resourceType,
      resourceId,
    });
  }

  static notResourceOwner(): AuthorizationError {
    return new AuthorizationError('You do not own this resource');
  }
}

// ============================================================================
// Database Errors
// ============================================================================

/**
 * Database error - thrown when database operations fail
 *
 * @example
 * throw new DatabaseError('Failed to create user', {
 *   operation: 'INSERT',
 *   table: 'users',
 *   originalError: err.message
 * });
 */
export class DatabaseError extends ApplicationError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 500, metadata);
  }

  static queryFailed(query: string, error: Error): DatabaseError {
    return new DatabaseError('Database query failed', {
      query: query.substring(0, 100), // Truncate for security
      error: error.message,
    });
  }

  static connectionFailed(error: Error): DatabaseError {
    return new DatabaseError('Database connection failed', {
      error: error.message,
    });
  }

  static constraintViolation(
    constraint: string,
    table: string,
    error?: Error
  ): DatabaseError {
    return new DatabaseError(`Database constraint violation: ${constraint}`, {
      constraint,
      table,
      ...(error && { originalError: error.message }),
    });
  }

  static uniqueViolation(field: string, value: string): DatabaseError {
    return new DatabaseError(`${field} already exists`, {
      field,
      value,
      constraint: 'unique',
    });
  }

  static transactionFailed(error: Error): DatabaseError {
    return new DatabaseError('Database transaction failed', {
      error: error.message,
    });
  }
}

// ============================================================================
// Not Found Errors
// ============================================================================

/**
 * Not found error - thrown when resource doesn't exist
 *
 * @example
 * throw new NotFoundError('User not found', {
 *   resource: 'user',
 *   id: 123
 * });
 */
export class NotFoundError extends ApplicationError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 404, metadata);
  }

  static user(identifier: string | number): NotFoundError {
    return new NotFoundError('User not found', {
      resource: 'user',
      identifier,
    });
  }

  static contentPack(id: number): NotFoundError {
    return new NotFoundError('Content pack not found', {
      resource: 'content_pack',
      id,
    });
  }

  static knowledge(id: number): NotFoundError {
    return new NotFoundError('Knowledge node not found', {
      resource: 'knowledge',
      id,
    });
  }

  static quizSession(id: number): NotFoundError {
    return new NotFoundError('Quiz session not found', {
      resource: 'quiz_session',
      id,
    });
  }

  static resource(resourceType: string, id: number): NotFoundError {
    return new NotFoundError(`${resourceType} not found`, {
      resource: resourceType,
      id,
    });
  }
}

// ============================================================================
// Business Logic Errors
// ============================================================================

/**
 * Business logic error - thrown when business rules are violated
 *
 * @example
 * throw new BusinessLogicError('Cannot delete category with facts', {
 *   categoryId: 123,
 *   factCount: 5
 * });
 */
export class BusinessLogicError extends ApplicationError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 422, metadata);
  }

  static invalidHierarchy(parentType: string, childType: string): BusinessLogicError {
    return new BusinessLogicError('Invalid knowledge hierarchy', {
      parentType,
      childType,
      reason: 'hierarchy_rule_violation',
    });
  }

  static duplicateSubscription(userId: number, packId: number): BusinessLogicError {
    return new BusinessLogicError('User already subscribed to this content pack', {
      userId,
      packId,
    });
  }

  static subscriptionExpired(subscriptionId: number): BusinessLogicError {
    return new BusinessLogicError('Subscription has expired', {
      subscriptionId,
    });
  }

  static noActiveSubscription(userId: number, packId: number): BusinessLogicError {
    return new BusinessLogicError('No active subscription to this content pack', {
      userId,
      packId,
    });
  }
}

// ============================================================================
// Rate Limit Errors
// ============================================================================

/**
 * Rate limit error - thrown when rate limit is exceeded
 *
 * @example
 * throw new RateLimitError('Too many login attempts', {
 *   limit: 5,
 *   window: '15 minutes',
 *   retryAfter: 300
 * });
 */
export class RateLimitError extends ApplicationError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 429, metadata);
  }

  static loginAttempts(retryAfter: number): RateLimitError {
    return new RateLimitError('Too many login attempts', {
      limit: 5,
      window: '15 minutes',
      retryAfter,
    });
  }

  static apiRequests(limit: number, window: string, retryAfter: number): RateLimitError {
    return new RateLimitError('Rate limit exceeded', {
      limit,
      window,
      retryAfter,
    });
  }
}

// ============================================================================
// Error Type Guards
// ============================================================================

/**
 * Check if error is an ApplicationError
 */
export const isApplicationError = (error: unknown): error is ApplicationError => {
  return error instanceof ApplicationError;
};

/**
 * Check if error is a ValidationError
 */
export const isValidationError = (error: unknown): error is ValidationError => {
  return error instanceof ValidationError;
};

/**
 * Check if error is an AuthenticationError
 */
export const isAuthenticationError = (error: unknown): error is AuthenticationError => {
  return error instanceof AuthenticationError;
};

/**
 * Check if error is an AuthorizationError
 */
export const isAuthorizationError = (error: unknown): error is AuthorizationError => {
  return error instanceof AuthorizationError;
};

/**
 * Check if error is a DatabaseError
 */
export const isDatabaseError = (error: unknown): error is DatabaseError => {
  return error instanceof DatabaseError;
};

/**
 * Check if error is a NotFoundError
 */
export const isNotFoundError = (error: unknown): error is NotFoundError => {
  return error instanceof NotFoundError;
};

/**
 * Check if error is a BusinessLogicError
 */
export const isBusinessLogicError = (error: unknown): error is BusinessLogicError => {
  return error instanceof BusinessLogicError;
};

/**
 * Check if error is a RateLimitError
 */
export const isRateLimitError = (error: unknown): error is RateLimitError => {
  return error instanceof RateLimitError;
};

// ============================================================================
// Error Conversion Helpers
// ============================================================================

/**
 * Convert unknown error to ApplicationError
 *
 * @param error - Error to convert
 * @returns ApplicationError instance
 *
 * @example
 * try {
 *   // some code
 * } catch (err) {
 *   const appError = toApplicationError(err);
 *   return res.status(appError.statusCode).json(appError.toJSON());
 * }
 */
export const toApplicationError = (error: unknown): ApplicationError => {
  if (isApplicationError(error)) {
    return error;
  }

  if (error instanceof Error) {
    // Check for specific database error codes (PostgreSQL)
    if ('code' in error) {
      const code = (error as any).code;

      // Unique constraint violation
      if (code === '23505') {
        return DatabaseError.uniqueViolation('field', 'value');
      }

      // Foreign key violation
      if (code === '23503') {
        return DatabaseError.constraintViolation('foreign_key', 'unknown', error);
      }

      // Check constraint violation
      if (code === '23514') {
        return DatabaseError.constraintViolation('check', 'unknown', error);
      }
    }

    return new ApplicationError(error.message, 500, {
      originalError: error.name,
    });
  }

  if (typeof error === 'string') {
    return new ApplicationError(error, 500);
  }

  return new ApplicationError('An unknown error occurred', 500, {
    error: String(error),
  });
};

/**
 * Convert error to HTTP response format
 *
 * @param error - Error to convert
 * @returns Object suitable for HTTP response
 *
 * @example
 * const responseBody = errorToResponse(error);
 * res.status(responseBody.statusCode).json(responseBody);
 */
export const errorToResponse = (
  error: unknown
): { statusCode: number; body: Record<string, unknown> } => {
  const appError = toApplicationError(error);
  return {
    statusCode: appError.statusCode,
    body: appError.toJSON(),
  };
};
