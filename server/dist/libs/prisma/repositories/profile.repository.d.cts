import { TProfile } from '../../zod/types/profile.type.cjs';
import 'zod';
import '../../zod/schemas/profile.schema.cjs';

/**
 * @name profileRepository
 * @description Repository for performing CRUD operations on the Profile model
 */
declare const profileRepository: {
    /**
     * @name create
     * @description Creates a new profile in the database with validation.
     * @param {object} data - Profile data to be created.
     * @returns {Promise<object>} The created profile.
     * @throws {Error} Validation errors if the arguements are invalid.
     */
    create(data: TProfile): Promise<{
        id: number;
        email: string;
        is_anonymous: boolean | null;
        is_active: boolean;
        verified_at: Date | null;
        banned_by: number | null;
        banned_at: Date | null;
        banned_until: Date | null;
        banned_reason: string | null;
        language_code: string;
        is_language_ltr: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    /**
     * @name update
     * @description Updates an existing profile with validation.
     * @param {object} where - Unique identifier (id or email).
     * @param {object} data - Data to update.
     * @returns {Promise<object>} The updated profile.
     * @throws {Error} Validation errors if the arguements are invalid.
     */
    update(where: {
        id: number;
    } | {
        email: string;
    }, data: TProfile): Promise<{
        id: number;
        email: string;
        is_anonymous: boolean | null;
        is_active: boolean;
        verified_at: Date | null;
        banned_by: number | null;
        banned_at: Date | null;
        banned_until: Date | null;
        banned_reason: string | null;
        language_code: string;
        is_language_ltr: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    /**
     * @name findUnique
     * @description Finds a unique profile by id or email.
     * @param {object} where - Either { id } or { email }.
     * @returns {Promise<object|null>} The profile if found, or null.
     * @throws {Error} Validation errors if the arguements are invalid.
     */
    findUnique(where: {
        id: number;
    } | {
        email: string;
    }): Promise<{
        id: number;
        email: string;
        is_anonymous: boolean | null;
        is_active: boolean;
        verified_at: Date | null;
        banned_by: number | null;
        banned_at: Date | null;
        banned_until: Date | null;
        banned_reason: string | null;
        language_code: string;
        is_language_ltr: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    /**
     * @name delete
     * @description Deletes a profile.
     * @param {object} where - Either { id } or { email }.
     * @returns {Promise<object>} The deleted profile.
     * @throws {Error} Validation errors if the arguements are invalid.
     */
    delete(where: {
        id: number;
    } | {
        email: string;
    }): Promise<{
        id: number;
        email: string;
        is_anonymous: boolean | null;
        is_active: boolean;
        verified_at: Date | null;
        banned_by: number | null;
        banned_at: Date | null;
        banned_until: Date | null;
        banned_reason: string | null;
        language_code: string;
        is_language_ltr: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    /**
     * @name delete
     * @description Deletes a profile.
     * @param {object} where - Either { id } or { email }.
     * @returns {Promise<object>} The deleted profile.
     * @throws {Error} Validation errors if the arguements are invalid.
     */
    obliterate(where: {
        id: number;
    } | {
        email: string;
    }): Promise<{
        id: number;
        email: string;
        is_anonymous: boolean | null;
        is_active: boolean;
        verified_at: Date | null;
        banned_by: number | null;
        banned_at: Date | null;
        banned_until: Date | null;
        banned_reason: string | null;
        language_code: string;
        is_language_ltr: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
};

export { profileRepository };
