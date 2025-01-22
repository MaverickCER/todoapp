import { prisma } from "@/prisma";
import {
  profileSchemaCreate,
  profileSchemaUniqueWhere,
  profileSchemaUpdate
} from "@/zod";
const profileRepository = {
  /**
   * @name create
   * @description Creates a new profile in the database with validation.
   * @param {object} data - Profile data to be created.
   * @returns {Promise<object>} The created profile.
   * @throws {Error} Validation errors if the arguements are invalid.
   */
  async create(data) {
    const validatedData = profileSchemaCreate.safeParse(data);
    if (!validatedData.success) throw new Error(validatedData.error.message);
    const user = await prisma.profile.create({
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
    const validatedWhere = profileSchemaUniqueWhere.safeParse(where);
    if (!validatedWhere.success) throw new Error(validatedWhere.error.message);
    const validatedData = profileSchemaUpdate.safeParse(data);
    if (!validatedData.success) throw new Error(validatedData.error.message);
    return await prisma.profile.update({
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
    const validatedWhere = profileSchemaUniqueWhere.safeParse(where);
    if (!validatedWhere.success) throw new Error(validatedWhere.error.message);
    return await prisma.profile.findUnique({ where: validatedWhere.data });
  },
  /**
   * @name delete
   * @description Deletes a profile.
   * @param {object} where - Either { id } or { email }.
   * @returns {Promise<object>} The deleted profile.
   * @throws {Error} Validation errors if the arguements are invalid.
   */
  async delete(where) {
    const validatedWhere = profileSchemaUniqueWhere.safeParse(where);
    if (!validatedWhere.success) throw new Error(validatedWhere.error.message);
    return await prisma.profile.update({
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
    const validatedWhere = profileSchemaUniqueWhere.safeParse(where);
    if (!validatedWhere.success) throw new Error(validatedWhere.error.message);
    return await prisma.profile.delete({ where: validatedWhere.data });
  }
};
export {
  profileRepository
};
