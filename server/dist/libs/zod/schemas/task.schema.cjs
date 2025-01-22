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
var task_schema_exports = {};
__export(task_schema_exports, {
  default: () => task_schema_default,
  taskSchema: () => taskSchema,
  taskSchemaCreate: () => taskSchemaCreate,
  taskSchemaCreateClient: () => taskSchemaCreateClient,
  taskSchemaDeleteProfileWhere: () => taskSchemaDeleteProfileWhere,
  taskSchemaFindManyhere: () => taskSchemaFindManyhere,
  taskSchemaProfileWhere: () => taskSchemaProfileWhere,
  taskSchemaUniqueWhere: () => taskSchemaUniqueWhere,
  taskSchemaUpdate: () => taskSchemaUpdate,
  tasksSchema: () => tasksSchema,
  tasksSchemaId: () => tasksSchemaId,
  tasksSchemaProfileId: () => tasksSchemaProfileId
});
module.exports = __toCommonJS(task_schema_exports);
var import_zod = require("zod");
const taskSchema = import_zod.z.object({
  id: import_zod.z.number().int().optional().transform((val) => parseInt(`${val}`, 10)),
  is_active: import_zod.z.boolean().default(true).optional(),
  title: import_zod.z.string().optional(),
  color: import_zod.z.string().optional(),
  completed: import_zod.z.boolean().default(false).optional(),
  createdAt: import_zod.z.date().optional(),
  updatedAt: import_zod.z.date().optional(),
  profileId: import_zod.z.number().int().transform((val) => parseInt(`${val}`, 10))
});
const taskSchemaCreate = taskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
}).extend({
  title: import_zod.z.string(),
  color: import_zod.z.string()
});
const taskSchemaCreateClient = taskSchemaCreate.omit({
  profileId: true
});
const taskSchemaUpdate = taskSchema.partial();
const taskSchemaUniqueWhere = import_zod.z.object({
  id: import_zod.z.number().int(),
  profileId: import_zod.z.number().int()
});
const taskSchemaProfileWhere = import_zod.z.object({
  profileId: import_zod.z.number().int()
});
const tasksSchemaId = import_zod.z.object({
  id: import_zod.z.number().int().transform((val) => parseInt(`${val}`, 10))
});
const tasksSchemaProfileId = import_zod.z.object({
  profileId: import_zod.z.number().int().transform((val) => parseInt(`${val}`, 10))
});
const taskSchemaDeleteProfileWhere = taskSchemaUniqueWhere.or(
  taskSchemaProfileWhere
);
const taskSchemaFindManyhere = import_zod.z.object({
  profileId: import_zod.z.number().int(),
  is_active: import_zod.z.boolean().optional()
});
const tasksSchema = import_zod.z.array(taskSchema);
var task_schema_default = taskSchema;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  taskSchema,
  taskSchemaCreate,
  taskSchemaCreateClient,
  taskSchemaDeleteProfileWhere,
  taskSchemaFindManyhere,
  taskSchemaProfileWhere,
  taskSchemaUniqueWhere,
  taskSchemaUpdate,
  tasksSchema,
  tasksSchemaId,
  tasksSchemaProfileId
});
