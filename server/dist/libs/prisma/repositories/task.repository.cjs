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
var task_repository_exports = {};
__export(task_repository_exports, {
  taskRepository: () => taskRepository
});
module.exports = __toCommonJS(task_repository_exports);
var import_prisma = require("@/prisma");
var import_parseDates = __toESM(require("@/utils/parseDates"), 1);
var import_zod = require("@/zod");
const taskRepository = {
  /**
   * @name create
   * @description Creates a new task in the database with validation.
   * @param {object} data - Profile data to be created.
   * @returns {Promise<object>} The created task.
   * @throws {Error} Validation errors if the arguements are invalid.
   */
  async create(data) {
    const validatedData = import_zod.taskSchemaCreate.safeParse(data);
    if (!validatedData.success) throw new Error(validatedData.error.message);
    return await import_prisma.prisma.task.create({ data: validatedData.data });
  },
  /**
   * @name update
   * @description Updates an existing task with validation.
   * @param {object} where - { id }.
   * @param {object} data - Data to update.
   * @returns {Promise<object>} The updated task.
   * @throws {Error} Validation errors if the arguements are invalid.
   */
  async update(where, data) {
    const validatedWhere = import_zod.taskSchemaUniqueWhere.safeParse(where);
    if (!validatedWhere.success) throw new Error(validatedWhere.error.message);
    const validatedData = import_zod.taskSchemaUpdate.safeParse((0, import_parseDates.default)(data));
    if (!validatedData.success) throw new Error(validatedData.error.message);
    return await import_prisma.prisma.task.update({
      where: validatedWhere.data,
      data: validatedData.data
    });
  },
  /**
   * @name findUnique
   * @description Finds a unique task by id or email.
   * @param {object} where - { id }
   * @returns {Promise<object|null>} The task if found, or null.
   * @throws {Error} Validation errors if the arguements are invalid.
   */
  async findUnique(where) {
    const validatedWhere = import_zod.taskSchemaUniqueWhere.safeParse(where);
    if (!validatedWhere.success) throw new Error(validatedWhere.error.message);
    return await import_prisma.prisma.task.findUnique({ where: validatedWhere.data });
  },
  /**
   * @name findMany
   * @description Finds a unique task by id or email.
   * @param {object} where - { profileId }
   * @returns {Promise<object|null>} The task if found, or null.
   * @throws {Error} Validation errors if the arguements are invalid.
   */
  async findMany(where) {
    const validatedWhere = import_zod.taskSchemaFindManyhere.safeParse(where);
    if (!validatedWhere.success) throw new Error(validatedWhere.error.message);
    return await import_prisma.prisma.task.findMany({ where: validatedWhere.data });
  },
  /**
   * @name delete
   * @description Deletes a task.
   * @param {object} where - Either { id } or { profileId }
   * @returns {Promise<object>} The deleted task.
   * @throws {Error} Validation errors if the arguements are invalid.
   */
  async delete(where) {
    const validatedWhere = import_zod.taskSchemaDeleteProfileWhere.safeParse(where);
    if (!validatedWhere.success) throw new Error(validatedWhere.error.message);
    return await import_prisma.prisma.task.updateMany({
      where: validatedWhere.data,
      data: { is_active: false }
    });
  },
  /**
   * @name delete
   * @description Deletes a task.
   * @param {object} where - Either { id } or { profileId }
   * @returns {Promise<object>} The deleted task.
   * @throws {Error} Validation errors if the arguements are invalid.
   */
  async obliterate(where) {
    const validatedWhere = import_zod.taskSchemaDeleteProfileWhere.safeParse(where);
    if (!validatedWhere.success) throw new Error(validatedWhere.error.message);
    return await import_prisma.prisma.task.deleteMany({ where: validatedWhere.data });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  taskRepository
});
