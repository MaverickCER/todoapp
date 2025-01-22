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
var profile_repository_exports = {};
__export(profile_repository_exports, {
  profileRepository: () => profileRepository
});
module.exports = __toCommonJS(profile_repository_exports);
var import_prisma = require("@/prisma");
var import_zod = require("@/zod");
const profileRepository = {
  /**
   * @name create
   * @description Creates a new profile in the database with validation.
   * @param {object} data - Profile data to be created.
   * @returns {Promise<object>} The created profile.
   * @throws {Error} Validation errors if the arguements are invalid.
   */
  async create(data) {
    const validatedData = import_zod.profileSchemaCreate.safeParse(data);
    if (!validatedData.success) throw new Error(validatedData.error.message);
    const user = await import_prisma.prisma.profile.create({
      data: { ...validatedData.data }
    });
    if (user.email === "anonymous+@gmail.com") {
      return await profileRepository.update(
        { id: user.id },
        { email: "anonymous+" + user.id + "@gmail.com" }
      );
    }
    return user;
  },
  /**
   * @name update
   * @description Updates an existing profile with validation.
   * @param {object} where - Unique identifier (id or email).
   * @param {object} data - Data to update.
   * @returns {Promise<object>} The updated profile.
   * @throws {Error} Validation errors if the arguements are invalid.
   */
  async update(where, data) {
    const validatedWhere = import_zod.profileSchemaUniqueWhere.safeParse(where);
    if (!validatedWhere.success) throw new Error(validatedWhere.error.message);
    const validatedData = import_zod.profileSchemaUpdate.safeParse(data);
    if (!validatedData.success) throw new Error(validatedData.error.message);
    return await import_prisma.prisma.profile.update({
      where: validatedWhere.data,
      data: validatedData.data
    });
  },
  /**
   * @name findUnique
   * @description Finds a unique profile by id or email.
   * @param {object} where - Either { id } or { email }.
   * @returns {Promise<object|null>} The profile if found, or null.
   * @throws {Error} Validation errors if the arguements are invalid.
   */
  async findUnique(where) {
    const validatedWhere = import_zod.profileSchemaUniqueWhere.safeParse(where);
    if (!validatedWhere.success) throw new Error(validatedWhere.error.message);
    return await import_prisma.prisma.profile.findUnique({ where: validatedWhere.data });
  },
  /**
   * @name delete
   * @description Deletes a profile.
   * @param {object} where - Either { id } or { email }.
   * @returns {Promise<object>} The deleted profile.
   * @throws {Error} Validation errors if the arguements are invalid.
   */
  async delete(where) {
    const validatedWhere = import_zod.profileSchemaUniqueWhere.safeParse(where);
    if (!validatedWhere.success) throw new Error(validatedWhere.error.message);
    return await import_prisma.prisma.profile.update({
      where: validatedWhere.data,
      data: { is_active: false }
    });
  },
  /**
   * @name delete
   * @description Deletes a profile.
   * @param {object} where - Either { id } or { email }.
   * @returns {Promise<object>} The deleted profile.
   * @throws {Error} Validation errors if the arguements are invalid.
   */
  async obliterate(where) {
    const validatedWhere = import_zod.profileSchemaUniqueWhere.safeParse(where);
    if (!validatedWhere.success) throw new Error(validatedWhere.error.message);
    return await import_prisma.prisma.profile.delete({ where: validatedWhere.data });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  profileRepository
});
