import { z } from 'zod';

declare const profileSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    email: z.ZodOptional<z.ZodString>;
    is_anonymous: z.ZodOptional<z.ZodDefault<z.ZodNullable<z.ZodBoolean>>>;
    is_active: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    verified_at: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    banned_by: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    banned_at: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    banned_until: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    banned_reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    language_code: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    is_language_ltr: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id?: number | undefined;
    email?: string | undefined;
    is_anonymous?: boolean | null | undefined;
    is_active?: boolean | undefined;
    verified_at?: Date | null | undefined;
    banned_by?: number | null | undefined;
    banned_at?: Date | null | undefined;
    banned_until?: Date | null | undefined;
    banned_reason?: string | null | undefined;
    language_code?: string | undefined;
    is_language_ltr?: boolean | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}, {
    id?: number | undefined;
    email?: string | undefined;
    is_anonymous?: boolean | null | undefined;
    is_active?: boolean | undefined;
    verified_at?: Date | null | undefined;
    banned_by?: number | null | undefined;
    banned_at?: Date | null | undefined;
    banned_until?: Date | null | undefined;
    banned_reason?: string | null | undefined;
    language_code?: string | undefined;
    is_language_ltr?: boolean | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}>;

declare const profileSchemaCreate: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
declare const profileSchemaId: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
declare const profileSchemaUniqueWhere: z.ZodUnion<[z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>, z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>]>;
declare const profilesSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    email: z.ZodOptional<z.ZodString>;
    is_anonymous: z.ZodOptional<z.ZodDefault<z.ZodNullable<z.ZodBoolean>>>;
    is_active: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    verified_at: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    banned_by: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    banned_at: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    banned_until: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    banned_reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    language_code: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    is_language_ltr: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id?: number | undefined;
    email?: string | undefined;
    is_anonymous?: boolean | null | undefined;
    is_active?: boolean | undefined;
    verified_at?: Date | null | undefined;
    banned_by?: number | null | undefined;
    banned_at?: Date | null | undefined;
    banned_until?: Date | null | undefined;
    banned_reason?: string | null | undefined;
    language_code?: string | undefined;
    is_language_ltr?: boolean | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}, {
    id?: number | undefined;
    email?: string | undefined;
    is_anonymous?: boolean | null | undefined;
    is_active?: boolean | undefined;
    verified_at?: Date | null | undefined;
    banned_by?: number | null | undefined;
    banned_at?: Date | null | undefined;
    banned_until?: Date | null | undefined;
    banned_reason?: string | null | undefined;
    language_code?: string | undefined;
    is_language_ltr?: boolean | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}>, "many">;
declare const profileSchemaUpdate: z.ZodObject<{
    id: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    email: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    is_anonymous: z.ZodOptional<z.ZodOptional<z.ZodDefault<z.ZodNullable<z.ZodBoolean>>>>;
    is_active: z.ZodOptional<z.ZodOptional<z.ZodDefault<z.ZodBoolean>>>;
    verified_at: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodDate>>>;
    banned_by: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
    banned_at: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodDate>>>;
    banned_until: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodDate>>>;
    banned_reason: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    language_code: z.ZodOptional<z.ZodOptional<z.ZodDefault<z.ZodString>>>;
    is_language_ltr: z.ZodOptional<z.ZodOptional<z.ZodDefault<z.ZodBoolean>>>;
    createdAt: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
    updatedAt: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
}, "strip", z.ZodTypeAny, {
    id?: number | undefined;
    email?: string | undefined;
    is_anonymous?: boolean | null | undefined;
    is_active?: boolean | undefined;
    verified_at?: Date | null | undefined;
    banned_by?: number | null | undefined;
    banned_at?: Date | null | undefined;
    banned_until?: Date | null | undefined;
    banned_reason?: string | null | undefined;
    language_code?: string | undefined;
    is_language_ltr?: boolean | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}, {
    id?: number | undefined;
    email?: string | undefined;
    is_anonymous?: boolean | null | undefined;
    is_active?: boolean | undefined;
    verified_at?: Date | null | undefined;
    banned_by?: number | null | undefined;
    banned_at?: Date | null | undefined;
    banned_until?: Date | null | undefined;
    banned_reason?: string | null | undefined;
    language_code?: string | undefined;
    is_language_ltr?: boolean | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}>;

export { profileSchema as default, profileSchema, profileSchemaCreate, profileSchemaId, profileSchemaUniqueWhere, profileSchemaUpdate, profilesSchema };
