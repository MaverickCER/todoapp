import { z } from 'zod';

export const profileSchema = z.object({
  id: z.number().int().optional(),
  email: z.string().email().optional(),
  is_anonymous: z.boolean().nullable().default(false).optional(),
  is_active: z.boolean().default(true).optional(),
  verified_at: z.date().nullable().optional(),
  banned_by: z.number().int().nullable().optional(),
  banned_at: z.date().nullable().optional(),
  banned_until: z.date().nullable().optional(),
  banned_reason: z.string().nullable().optional(),
  language_code: z.string().default('en').optional(),
  is_language_ltr: z.boolean().default(true).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export default profileSchema;

export const profileSchemaCreate = z.object({
  email: z.string().email(),
});

export const profileSchemaId = z.object({
  id: z.number().int(),
});

export const profileSchemaUniqueWhere = profileSchemaId.or(profileSchemaCreate);

export const profilesSchema = z.array(profileSchema);

export const profileSchemaUpdate = profileSchema.partial();
