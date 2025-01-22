import { config } from "@/contracts/config.constants.js";
import { mailer } from "@/nodemailer";
import { stringify } from "./safeStringify";
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};
const canLog = (level) => {
  const debugLevel = process.env.DEBUG_LEVEL;
  const currentLogLevel = debugLevel && logLevels[debugLevel] !== void 0 ? debugLevel : "info";
  return logLevels[level] <= logLevels[currentLogLevel];
};
const debug = (message, ...rest) => {
  if (canLog("debug")) console.log(`[DEBUG - SERVER]`, message, ...rest);
};
const info = (message, ...rest) => {
  if (canLog("info")) console.info(`[INFO - SERVER]`, message, ...rest);
};
const warn = (message, ...rest) => {
  if (canLog("warn")) console.warn(`[WARN - SERVER]`, message, ...rest);
};
const error = (message, ...rest) => {
  if (canLog("error")) {
    console.error(`[ERROR - SERVER]`, message, ...rest);
    (async (message2) => {
      const sent = await mailer.send({
        to: config.EMAIL_TO,
        subject: `Action Required! maverickcer.com encountered server error`,
        text: message2
      });
      console.error(
        sent ? "Report sent via email from server" : "Report could not be sent from server"
      );
    })(message);
  }
};
const parseError = (error2) => {
  let message;
  let stack = "";
  if (error2 instanceof Error) {
    stack = stringify(error2.stack || "stack could not be stringified");
    message = `${error2.message || ""} - ${stack}`;
  } else if (typeof error2 === "object" && error2 !== null && "message" in error2 && typeof error2["message"] === "string") {
    message = error2.message;
  } else if (typeof error2 === "object" && error2 !== null && "error" in error2 && typeof error2["error"] === "string") {
    message = error2.error;
  } else if (typeof error2 === "string") {
    message = `${error2}`;
  } else {
    message = `Unknown Error`;
  }
  return message;
};
async function errorHandler(origin, callback, params, fallback, isCritical = false) {
  const parameters = stringify(params);
  let returnValue;
  try {
    logger.debug(
      `${origin}.${callback.name} starting with params: ${parameters}`
    );
    returnValue = await callback(params);
  } catch (error2) {
    const source = `${origin}.${callback.name} caught with params: ${parameters} | `;
    const message = parseError(error2);
    if (isCritical) {
      logger.error(source + message);
    } else {
      logger.warn(source + message);
    }
    if (fallback === "message") {
      returnValue = message;
    } else {
      returnValue = fallback;
    }
  } finally {
    logger.debug(
      `${origin}.${callback.name} finished with params: ${parameters}, returning: ${stringify(returnValue)}`
    );
  }
  return returnValue;
}
const logger = {
  debug,
  info,
  warn,
  error,
  parseError,
  errorHandler
};
export {
  errorHandler,
  logger
};
