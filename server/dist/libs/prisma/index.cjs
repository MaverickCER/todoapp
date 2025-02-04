"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var prisma_exports = {};
__export(prisma_exports, {
  prisma: () => prisma
});
module.exports = __toCommonJS(prisma_exports);
var import_config = require("@/contracts/config.constants");
var import_client = require("@prisma/client");
__reExport(prisma_exports, require("./repositories/profile.repository"), module.exports);
__reExport(prisma_exports, require("./repositories/task.repository"), module.exports);
const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new import_client.PrismaClient();
if (import_config.config.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  prisma,
  ...require("./repositories/profile.repository"),
  ...require("./repositories/task.repository")
});
