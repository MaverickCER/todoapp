import { config } from '@/contracts/config.constants';
import { sendMail } from '@/services/next';
import { stringify } from './safeStringify';
let mailer: typeof import('@/libs/nodemailer').mailer | undefined;

if (typeof window === 'undefined') {
  import('@/libs/nodemailer').then((module) => {
    mailer = module.mailer;
  });
}

// Mapping log levels to numbers for easy comparison
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

// Check if the current log level allows logging for the requested level
const canLog = (level) => {
  if (config.IS_CLIENT)
    return logLevels[level] <= logLevels[config.NODE_ENV === 'development' ? 'logger.debug' : 'warn'];
  return logLevels[level] <= logLevels[process.env.DEBUG_LEVEL || 'info'];
};

// Logger functions for different log levels
const debug = (message, ...rest) => {
  if (canLog('logger.debug')) console.log(`[DEBUG - ${config.IS_CLIENT ? 'CLIENT' : 'SERVER'}]`, message, ...rest);
};

const info = (message, ...rest) => {
  if (canLog('info')) console.info(`[INFO - ${config.IS_CLIENT ? 'CLIENT' : 'SERVER'}]`, message, ...rest);
};

const warn = (message, ...rest) => {
  if (canLog('warn')) console.warn(`[WARN - ${config.IS_CLIENT ? 'CLIENT' : 'SERVER'}]`, message, ...rest);
};

const error = (message, ...rest) => {
  if (canLog('error')) {
    console.error(`[ERROR - ${config.IS_CLIENT ? 'CLIENT' : 'SERVER'}]`, message, ...rest);
    (async (message) => {
      if (!mailer) {
        const formData = new FormData();
        formData.append('name', `Action Required! maverickcer.com encountered client error`);
        formData.append('email', `noreply@maverickcer.com`);
        formData.append('message', message);
        const sent = await sendMail(formData);
        console.error(sent ? 'Report sent via email from client' : 'Report could not be sent from client');
      } else {
        const sent = await mailer.send({
          to: config.EMAIL_TO,
          subject: `Action Required! maverickcer.com encountered server error`,
          text: message,
        });
        console.error(sent ? 'Report sent via email from server' : 'Report could not be sent from server');
      }
    })(message);
  }
};

const parseError = (error: unknown) => {
  let message: string;
  let stack = '';
  if (error instanceof Error) {
    stack = stringify(error.stack || 'stack could not be stringified');
    message = `${error.message || ''} - ${stack}`;
  } else if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error['message'] === 'string'
  ) {
    message = error.message;
  } else if (typeof error === 'object' && error !== null && 'error' in error && typeof error['error'] === 'string') {
    message = error.error;
  } else if (typeof error === 'string') {
    message = `${error}`;
  } else {
    message = `Unknown Error`;
  }
  return message;
};

/**
 * @name errorHandler
 * @description A utility function to handle errors in asynchronous operations, providing logging, optional email notifications, and a fallback response.
 * @example
 * const result = await errorHandler('ModuleName', someAsyncFunction, { key: value }, fallbackValue, true);
 * @param {string} origin - Identifies the origin of the error for logging purposes.
 * @param {function} callback - The asynchronous function to be executed. Must accept `params` and return the same type as `fallback`.
 * @param {P} params - Parameters to be passed to the callback.
 * @param {R} fallback - The fallback response in case of an error. If the string 'message' is provided, a string containing the error message is returned instead.
 * @param {boolean} [isCritical=false] - Indicates whether the error is critical, triggering additional notifications.
 * @returns {Promise<R | (R extends 'message' ? string : never)>} The result of the callback function or the fallback value (or a string message if fallback is 'message').
 */
export async function errorHandler<P, R>(
  origin: string,
  callback: (params: P) => Promise<R>,
  params: P,
  fallback: R,
  isCritical: boolean = false,
): Promise<R | (R extends 'message' ? string : never)> {
  const parameters = stringify(params);
  let returnValue: R | (R extends 'message' ? string : never) | undefined; // Variable to store return value

  try {
    logger.debug(`${origin}.${callback.name} starting with params: ${parameters}`);
    returnValue = await callback(params); // Capture return value
  } catch (error) {
    const source = `${origin}.${callback.name} caught with params: ${parameters} | `;
    const message = parseError(error);

    // Notify if critical and in production
    if (isCritical) {
      logger.error(source + message);
    } else {
      logger.warn(source + message);
    }

    // Return fallback value or error message
    if (fallback === 'message') {
      returnValue = message as R extends 'message' ? string : never;
    } else {
      returnValue = fallback;
    }
  } finally {
    // Log return data in the finally block, ensuring returnValue is always assigned
    logger.debug(
      `${origin}.${callback.name} finished with params: ${parameters}, returning: ${stringify(returnValue)}`,
    );
  }

  return returnValue;
}

// Export the logger with the logging methods
export const logger = {
  debug,
  info,
  warn,
  error,
  parseError,
  errorHandler,
};
