const fs = require('fs').promises;
const path = require('path');

/**
 * Custom error classes for better error handling
 */
class ValidationError extends Error {
  constructor(message, details = []) {
    super(message);
    this.name = 'ValidationError';
    this.code = 'VALIDATION_ERROR';
    this.details = details;
    this.statusCode = 400;
  }
}

class NotFoundError extends Error {
  constructor(message = 'Resource not found') {
    super(message);
    this.name = 'NotFoundError';
    this.code = 'NOT_FOUND';
    this.statusCode = 404;
  }
}

class DatabaseError extends Error {
  constructor(message = 'Database operation failed') {
    super(message);
    this.name = 'DatabaseError';
    this.code = 'DATABASE_ERROR';
    this.statusCode = 500;
  }
}

class FileOperationError extends Error {
  constructor(message = 'File operation failed') {
    super(message);
    this.name = 'FileOperationError';
    this.code = 'FILE_ERROR';
    this.statusCode = 500;
  }
}

/**
 * Safe JSON file operations with error handling
 */
async function safeReadJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new NotFoundError(`File not found: ${path.basename(filePath)}`);
    }
    if (error instanceof SyntaxError) {
      throw new DatabaseError(`Invalid JSON in file: ${path.basename(filePath)}`);
    }
    throw new FileOperationError(`Failed to read file: ${error.message}`);
  }
}

async function safeWriteJsonFile(filePath, data) {
  try {
    // Validate that data can be stringified
    const jsonString = JSON.stringify(data, null, 2);
    
    // Create backup before writing
    const backupPath = `${filePath}.backup`;
    try {
      await fs.copyFile(filePath, backupPath);
    } catch (error) {
      // If backup fails, it's not critical but should be logged
      console.warn(`Failed to create backup for ${filePath}: ${error.message}`);
    }
    
    // Write the new data
    await fs.writeFile(filePath, jsonString, 'utf8');
    
    return true;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new ValidationError('Data cannot be serialized to JSON');
    }
    throw new FileOperationError(`Failed to write file: ${error.message}`);
  }
}

/**
 * Data validation helpers
 */
function validateJsonStructure(data, expectedKeys = []) {
  if (!data || typeof data !== 'object') {
    throw new ValidationError('Invalid data: Expected object');
  }
  
  // Check for required keys
  for (const key of expectedKeys) {
    if (!(key in data)) {
      throw new ValidationError(`Missing required field: ${key}`);
    }
  }
  
  return true;
}

function sanitizeData(data) {
  // Remove potentially dangerous properties
  const sanitized = { ...data };
  
  // Remove prototype pollution attempts
  delete sanitized.__proto__;
  delete sanitized.constructor;
  delete sanitized.prototype;
  
  // Remove functions (shouldn't be in JSON anyway)
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'function') {
      delete sanitized[key];
    }
  }
  
  return sanitized;
}

/**
 * Standardized success response
 */
function sendSuccessResponse(res, data = null, message = 'Operation successful') {
  const response = {
    success: true,
    message,
    timestamp: new Date().toISOString()
  };
  
  if (data !== null) {
    response.data = data;
  }
  
  res.json(response);
}

/**
 * Standardized error response
 */
function sendErrorResponse(res, error, statusCode = 500) {
  const response = {
    success: false,
    error: error.message || 'Internal server error',
    code: error.code || 'INTERNAL_ERROR',
    timestamp: new Date().toISOString()
  };
  
  // Add details for validation errors
  if (error.details && Array.isArray(error.details)) {
    response.details = error.details;
  }
  
  // Don't expose sensitive information in production
  if (process.env.NODE_ENV !== 'production') {
    response.stack = error.stack;
  }
  
  res.status(statusCode).json(response);
}

/**
 * Express error handling middleware
 */
function errorHandler(err, req, res, next) {
  // In production, log errors but don't expose sensitive details
  if (process.env.NODE_ENV === 'production') {
    console.error(`Error in ${req.method} ${req.path}:`, {
      message: err.message,
      code: err.code,
      statusCode: err.statusCode,
      timestamp: new Date().toISOString()
    });
  } else {
    console.error(`Error in ${req.method} ${req.path}:`, err);
  }
  
  // Handle known error types
  if (err instanceof ValidationError) {
    return sendErrorResponse(res, err, 400);
  }
  
  if (err instanceof NotFoundError) {
    return sendErrorResponse(res, err, 404);
  }
  
  if (err instanceof DatabaseError || err instanceof FileOperationError) {
    // In production, don't expose internal error details
    const message = process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message;
    return sendErrorResponse(res, { 
      message, 
      code: err.code 
    }, 500);
  }
  
  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return sendErrorResponse(res, { 
      message: 'Invalid token', 
      code: 'INVALID_TOKEN' 
    }, 401);
  }
  
  if (err.name === 'TokenExpiredError') {
    return sendErrorResponse(res, { 
      message: 'Token expired', 
      code: 'TOKEN_EXPIRED' 
    }, 401);
  }
  
  // Handle CORS errors
  if (err.message === 'Not allowed by CORS') {
    return sendErrorResponse(res, { 
      message: 'CORS policy violation', 
      code: 'CORS_ERROR' 
    }, 403);
  }
  
  // Handle multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return sendErrorResponse(res, { 
      message: 'File too large', 
      code: 'FILE_TOO_LARGE' 
    }, 400);
  }
  
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return sendErrorResponse(res, { 
      message: 'Unexpected file field', 
      code: 'UNEXPECTED_FILE' 
    }, 400);
  }
  
  // Handle syntax errors (malformed JSON, etc.)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return sendErrorResponse(res, { 
      message: 'Invalid JSON format', 
      code: 'INVALID_JSON' 
    }, 400);
  }
  
  // Handle unknown errors - never expose sensitive details in production
  sendErrorResponse(res, { 
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message || 'Internal server error', 
    code: 'INTERNAL_ERROR' 
  }, 500);
}

/**
 * Async wrapper to catch errors in async route handlers
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * 404 handler for unknown routes
 */
function notFoundHandler(req, res) {
  sendErrorResponse(res, { 
    message: `Route not found: ${req.method} ${req.path}`, 
    code: 'ROUTE_NOT_FOUND' 
  }, 404);
}

/**
 * Request validation middleware
 */
function validateRequest(req, res, next) {
  // Check content type for POST/PUT requests
  if (['POST', 'PUT'].includes(req.method)) {
    if (!req.is('application/json') && !req.is('multipart/form-data')) {
      return sendErrorResponse(res, { 
        message: 'Invalid content type', 
        code: 'INVALID_CONTENT_TYPE' 
      }, 400);
    }
  }
  
  // Check for required headers on protected routes only
  const publicPaths = ['/api/auth/', '/api/health'];
  const publicGetPaths = ['/api/hero', '/api/work', '/api/process', '/api/story', '/api/locations', '/api/contact', '/api/faq', '/api/images'];
  
  const isPublicPath = publicPaths.some(path => req.path.startsWith(path));
  const isPublicGetPath = publicGetPaths.some(path => req.path.startsWith(path)) && req.method === 'GET';
  
  if (req.path.startsWith('/api/') && !isPublicPath && !isPublicGetPath) {
    if (!req.headers.authorization) {
      return sendErrorResponse(res, { 
        message: 'Authorization header required', 
        code: 'MISSING_AUTH_HEADER' 
      }, 401);
    }
  }
  
  next();
}

/**
 * Security headers middleware
 */
function securityHeaders(req, res, next) {
  // Basic security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Production-specific security headers
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
    res.setHeader('X-Download-Options', 'noopen');
    res.setHeader('X-DNS-Prefetch-Control', 'off');
  }
  
  // Add CSP header for admin routes
  if (req.path.startsWith('/admin')) {
    const cspPolicy = process.env.NODE_ENV === 'production' 
      ? "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';"
      : "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self';";
    
    res.setHeader('Content-Security-Policy', cspPolicy);
  }
  
  // Remove server identification header
  res.removeHeader('X-Powered-By');
  
  next();
}

module.exports = {
  // Error classes
  ValidationError,
  NotFoundError,
  DatabaseError,
  FileOperationError,
  
  // File operations
  safeReadJsonFile,
  safeWriteJsonFile,
  
  // Data validation
  validateJsonStructure,
  sanitizeData,
  
  // Response helpers
  sendSuccessResponse,
  sendErrorResponse,
  
  // Middleware
  errorHandler,
  asyncHandler,
  notFoundHandler,
  validateRequest,
  securityHeaders
};