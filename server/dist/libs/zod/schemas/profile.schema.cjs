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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var profile_schema_exports = {};
__export(profile_schema_exports, {
  default: () => profile_schema_default,
  profileSchema: () => profileSchema,
  profileSchemaCreate: () => profileSchemaCreate,
  profileSchemaId: () => profileSchemaId,
  profileSchemaUniqueWhere: () => profileSchemaUniqueWhere,
  profileSchemaUpdate: () => profileSchemaUpdate,
  profilesSchema: () => profilesSchema
});
module.exports = __toCommonJS(profile_schema_exports);
var import_zod = require("zod");
const profileSchema = import_zod.z.object({
  id: import_zod.z.number().int().optional(),
  email: import_zod.z.string().email().optional(),
  is_anonymous: import_zod.z.boolean().nullable().default(false).optional(),
  is_active: import_zod.z.boolean().default(true).optional(),
  verified_at: import_zod.z.date().nullable().optional(),
  banned_by: import_zod.z.number().int().nullable().optional(),
  banned_at: import_zod.z.date().nullable().optional(),
  banned_until: import_zod.z.date().nullable().optional(),
  banned_reason: import_zod.z.string().nullable().optional(),
  language_code: import_zod.z.string().default("en").optional(),
  is_language_ltr: import_zod.z.boolean().default(true).optional(),
  createdAt: import_zod.z.date().optional(),
  updatedAt: import_zod.z.date().optional()
});
var profile_schema_default = profileSchema;
const profileSchemaCreate = import_zod.z.object({
  email: import_zod.z.string().email()
});
const profileSchemaId = import_zod.z.object({
  id: import_zod.z.number().int()
});
const profileSchemaUniqueWhere = profileSchemaId.or(profileSchemaCreate);
const profilesSchema = import_zod.z.array(profileSchema);
const profileSchemaUpdate = profileSchema.partial();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  profileSchema,
  profileSchemaCreate,
  profileSchemaId,
  profileSchemaUniqueWhere,
  profileSchemaUpdate,
  profilesSchema
});
