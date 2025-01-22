"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_register = require("module-alias/register");
var import_config_constants = require("@/contracts/config.constants.js");
var import_utils = require("@/utils");
var import_body_parser = __toESM(require("body-parser"), 1);
var import_cluster = __toESM(require("cluster"), 1);
var import_express = __toESM(require("express"), 1);
var import_morgan = __toESM(require("morgan"), 1);
var os = __toESM(require("os"), 1);
var import_routes = __toESM(require("./routes"), 1);
const ALLOWED_LIST = "*";
async function main() {
  if (!process.versions.node.startsWith("20")) {
    console.log(
      `Incorrect version of Node, expected 16.x but got ${process.versions.node}`
    );
    return;
  }
  if (import_cluster.default.isPrimary) {
    console.log(
      `Starting Primary Process: ${process.pid}, env: ${process.env.NODE_ENV}`
    );
    const cpuCores = os.cpus();
    const numWorkers = import_config_constants.config.NUM_WORKERS > 0 && import_config_constants.config.NUM_WORKERS <= cpuCores.length ? import_config_constants.config.NUM_WORKERS : cpuCores.length;
    for (let i = 0; i < numWorkers; i++) {
      import_utils.logger.info(`Spawning worker ${i}`);
      const worker = import_cluster.default.fork();
      worker.on("message", (data) => {
        if (data.message === "configuration_request") {
          worker.send({ message: "configuration_response", keys: import_config_constants.config });
        }
      });
    }
    import_cluster.default.on("exit", (worker, code, signal) => {
      import_utils.logger.warn(`Worker ${worker.process.pid} died: ${code || signal}`);
      const newWorker = import_cluster.default.fork();
      newWorker.on("message", (data) => {
        if (data.message === "configuration_request") {
          newWorker.send({ message: "configuration_response", keys: import_config_constants.config });
        }
      });
    });
  } else {
    process.on(
      "message",
      (data) => {
        if (data?.message === "configuration_response") {
          childProcess();
        }
      }
    );
    process.send?.({ message: "configuration_request" });
  }
}
[
  `exit`,
  `SIGINT`,
  `SIGUSR1`,
  `SIGUSR2`,
  `uncaughtException`,
  `SIGTERM`
].forEach((eventType) => {
  process.on(eventType, (error) => {
    import_utils.logger.warn(`Process[${process.pid}] caught ${eventType}]`);
    if (eventType === "uncaughtException") {
      import_utils.logger.error(`Uncaught Exception: ${error}`);
    }
  });
});
function childProcess() {
  const app = (0, import_express.default)();
  app.disable("x-powered-by");
  app.use(import_body_parser.default.urlencoded({ extended: true }));
  import_utils.logger.info(`Allowed domains: ${ALLOWED_LIST}`);
  app.use(import_body_parser.default.json({ limit: "50mb" }));
  import_morgan.default.token("process-id", () => `Process[${process.pid}]`);
  app.use(
    (0, import_morgan.default)(
      ":process-id :date[iso] :remote-addr :method :url :status :res[content-length] - :response-time ms"
    )
  );
  app.listen(import_config_constants.config.PORT_CORE, () => {
    import_utils.logger.info(`Worker ${process.pid} listening on port ${import_config_constants.config.PORT_CORE}`);
    (0, import_routes.default)(app);
  });
  app.on("error", (error) => {
    const message = import_utils.logger.parseError(error);
    import_utils.logger.error(message);
    process.exit(1);
  });
}
main().catch((err) => {
  const message = import_utils.logger.parseError(err);
  import_utils.logger.error(`Unhandled Error: ${message}`);
});
