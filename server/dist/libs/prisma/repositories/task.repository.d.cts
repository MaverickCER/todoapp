import * as _prisma_client from '.prisma/client';
import { TTask } from '../../zod/types/task.type.cjs';
import 'zod';
import '../../zod/schemas/task.schema.cjs';

/**
 * @name taskRepository
 * @description Repository for performing CRUD operations on the Profile model
 */
declare const taskRepository: {
    /**
     * @name create
     * @description Creates a new task in the database with validation.
     * @param {object} data - Profile data to be created.
     * @returns {Promise<object>} The created task.
     * @throws {Error} Validation errors if the arguements are invalid.
     */
    create(data: Partial<TTask>): Promise<{
        title: string;
        id: number;
        is_active: boolean;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        completed: boolean;
        profileId: number;
    }>;
    /**
     * @name update
     * @description Updates an existing task with validation.
     * @param {object} where - { id }.
     * @param {object} data - Data to update.
     * @returns {Promise<object>} The updated task.
     * @throws {Error} Validation errors if the arguements are invalid.
     */
    update(where: {
        id: number;
        profileId: number;
    }, data: Partial<TTask>): Promise<{
        title: string;
        id: number;
        is_active: boolean;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        completed: boolean;
        profileId: number;
    }>;
    /**
     * @name findUnique
     * @description Finds a unique task by id or email.
     * @param {object} where - { id }
     * @returns {Promise<object|null>} The task if found, or null.
     * @throws {Error} Validation errors if the arguements are invalid.
     */
    findUnique(where: {
        id: number;
    }): Promise<{
        title: string;
        id: number;
        is_active: boolean;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        completed: boolean;
        profileId: number;
    } | null>;
    /**
     * @name findMany
     * @description Finds a unique task by id or email.
     * @param {object} where - { profileId }
     * @returns {Promise<object|null>} The task if found, or null.
     * @throws {Error} Validation errors if the arguements are invalid.
     */
    findMany(where: Partial<TTask>): Promise<{
        title: string;
        id: number;
        is_active: boolean;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        completed: boolean;
        profileId: number;
    }[]>;
    /**
     * @name delete
     * @description Deletes a task.
     * @param {object} where - Either { id } or { profileId }
     * @returns {Promise<object>} The deleted task.
     * @throws {Error} Validation errors if the arguements are invalid.
     */
    delete(where: {
        id: number;
        profileId: number;
    } | {
        profileId: number;
    }): Promise<_prisma_client.Prisma.BatchPayload>;
    /**
     * @name delete
     * @description Deletes a task.
     * @param {object} where - Either { id } or { profileId }
     * @returns {Promise<object>} The deleted task.
     * @throws {Error} Validation errors if the arguements are invalid.
     */
    obliterate(where: {
        id: number;
    } | {
        profileId: number;
    }): Promise<_prisma_client.Prisma.BatchPayload>;
};

export { taskRepository };
