import { z } from "zod";
const profileSchema = z.object({
  id: z.number().int().optional(),
  email: z.string().email().optional(),
  is_anonymous: z.boolean().nullable().default(false).optional(),
  is_active: z.boolean().default(true).optional(),
  verified_at: z.date().nullable().optional(),
  banned_by: z.number().int().nullable().optional(),
  banned_at: z.date().nullable().optional(),
  banned_until: z.date().nullable().optional(),
  banned_reason: z.string().nullable().optional(),
  language_code: z.string().default("en").optional(),
  is_language_ltr: z.boolean().default(true).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});
var profile_schema_default = profileSchema;
const profileSchemaCreate = z.object({
  email: z.string().email()
});
const profileSchemaId = z.object({
  id: z.number().int()
});
const profileSchemaUniqueWhere = profileSchemaId.or(profileSchemaCreate);
const profilesSchema = z.array(profileSchema);
const profileSchemaUpdate = profileSchema.partial();
export {
  profile_schema_default as default,
  profileSchema,
  profileSchemaCreate,
  profileSchemaId,
  profileSchemaUniqueWhere,
  profileSchemaUpdate,
  profilesSchema
};
