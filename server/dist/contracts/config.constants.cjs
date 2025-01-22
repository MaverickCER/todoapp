"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var config_constants_exports = {};
__export(config_constants_exports, {
  config: () => config
});
module.exports = __toCommonJS(config_constants_exports);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_zod = require("zod");
import_dotenv.default.config();
const ConfigSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.string().min(1, "NODE_ENV is required"),
  ALLOWED_LIST: import_zod.z.string().min(1, "ALLOWED_LIST is required"),
  DATABASE_URL: import_zod.z.string().min(1, "DATABASE_URL is required"),
  NUM_WORKERS: import_zod.z.string().transform((val) => parseInt(`${val}`, 10)),
  SECRET_KEY: import_zod.z.string().min(1, "SECRET_KEY is required"),
  PORT_CORE: import_zod.z.string().min(1, "PORT_CORE is required"),
  EMAIL_HOST: import_zod.z.string().min(1, "EMAIL_HOST is required"),
  EMAIL_PORT: import_zod.z.string().min(1, "EMAIL_PORT is required"),
  EMAIL_USER: import_zod.z.string().optional().transform((val) => val || ""),
  EMAIL_PASS: import_zod.z.string().optional().transform((val) => val || ""),
  EMAIL_TO: import_zod.z.string().email("EMAIL_TO must be a valid email address")
});
const configSchema = ConfigSchema.safeParse(process.env);
const emptyConfig = {
  ALLOWED_LIST: "*",
  NODE_ENV: "production",
  DATABASE_URL: "DATABASE_URL_MISSING",
  NUM_WORKERS: 1,
  SECRET_KEY: "secret",
  PORT_CORE: "5000",
  EMAIL_HOST: "",
  EMAIL_PORT: "",
  EMAIL_USER: "",
  EMAIL_PASS: "",
  EMAIL_TO: ""
};
if (!configSchema.success && typeof window === "undefined")
  throw new Error(configSchema.error.message);
const config = !configSchema.success ? emptyConfig : configSchema.data;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config
});
