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
declare function errorHandler<P, R>(origin: string, callback: (params: P) => Promise<R>, params: P, fallback: R, isCritical?: boolean): Promise<R | (R extends "message" ? string : never)>;
declare const logger: {
    debug: (message: string, ...rest: unknown[]) => void;
    info: (message: string, ...rest: unknown[]) => void;
    warn: (message: string, ...rest: unknown[]) => void;
    error: (message: string, ...rest: unknown[]) => void;
    parseError: (error: unknown) => string;
    errorHandler: typeof errorHandler;
};

export { errorHandler, logger };
