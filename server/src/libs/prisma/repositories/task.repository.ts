import { prisma } from '@/prisma';
import parseDates from '@/utils/parseDates';
import {
  taskSchemaCreate,
  taskSchemaDeleteProfileWhere,
  taskSchemaFindManyhere,
  taskSchemaUniqueWhere,
  taskSchemaUpdate,
  TTask,
} from '@/zod';

/**
 * @name taskRepository
 * @description Repository for performing CRUD operations on the Profile model
 */
export const taskRepository = {
  /**
   * @name create
   * @description Creates a new task in the database with validation.
   * @param {object} data - Profile data to be created.
   * @returns {Promise<object>} The created task.
   * @throws {Error} Validation errors if the arguements are invalid.
   */
  async create(data: Partial<TTask>) {
    // Validate the input data
    const validatedData = taskSchemaCreate.safeParse(data);
    if (!validatedData.success) throw new Error(validatedData.error.message);

    return await prisma.task.create({ data: validatedData.data });
  },

  /**
   * @name update
   * @description Updates an existing task with validation.
   * @param {object} where - { id }.
   * @param {object} data - Data to update.
   * @returns {Promise<object>} The updated task.
   * @throws {Error} Validation errors if the arguements are invalid.
   */
  async update(where: { id: number; profileId: number }, data: Partial<TTask>) {
    const validatedWhere = taskSchemaUniqueWhere.safeParse(where);
    if (!validatedWhere.success) throw new Error(validatedWhere.error.message);
    const validatedData = taskSchemaUpdate.safeParse(parseDates(data));
    if (!validatedData.success) throw new Error(validatedData.error.message);

    return await prisma.task.update({ where: validatedWhere.data, data: validatedData.data });
  },

  /**
   * @name findUnique
   * @description Finds a unique task by id or email.
   * @param {object} where - { id }
   * @returns {Promise<object|null>} The task if found, or null.
   * @throws {Error} Validation errors if the arguements are invalid.
   */
  async findUnique(where: { id: number }) {
    const validatedWhere = taskSchemaUniqueWhere.safeParse(where);
    if (!validatedWhere.success) throw new Error(validatedWhere.error.message);

    return await prisma.task.findUnique({ where: validatedWhere.data });
  },

  /**
   * @name findMany
   * @description Finds a unique task by id or email.
   * @param {object} where - { profileId }
   * @returns {Promise<object|null>} The task if found, or null.
   * @throws {Error} Validation errors if the arguements are invalid.
   */
  async findMany(where: Partial<TTask>) {
    const validatedWhere = taskSchemaFindManyhere.safeParse(where);
    if (!validatedWhere.success) throw new Error(validatedWhere.error.message);

    return await prisma.task.findMany({ where: validatedWhere.data });
  },

  /**
   * @name delete
   * @description Deletes a task.
   * @param {object} where - Either { id } or { profileId }
   * @returns {Promise<object>} The deleted task.
   * @throws {Error} Validation errors if the arguements are invalid.
   */
  async delete(where: { id: number; profileId: number } | { profileId: number }) {
    // Validate the "where" condition
    const validatedWhere = taskSchemaDeleteProfileWhere.safeParse(where);
    if (!validatedWhere.success) throw new Error(validatedWhere.error.message);

    return await prisma.task.updateMany({
      where: validatedWhere.data,
      data: { is_active: false },
    });
  },

  /**
   * @name delete
   * @description Deletes a task.
   * @param {object} where - Either { id } or { profileId }
   * @returns {Promise<object>} The deleted task.
   * @throws {Error} Validation errors if the arguements are invalid.
   */
  async obliterate(where: { id: number } | { profileId: number }) {
    const validatedWhere = taskSchemaDeleteProfileWhere.safeParse(where);
    if (!validatedWhere.success) throw new Error(validatedWhere.error.message);

    return await prisma.task.deleteMany({ where: validatedWhere.data });
  },
};
