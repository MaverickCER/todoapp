import { z } from 'zod';

declare const taskSchema: z.ZodObject<{
    id: z.ZodEffects<z.ZodOptional<z.ZodNumber>, number, number | undefined>;
    is_active: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    title: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    completed: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
    profileId: z.ZodEffects<z.ZodNumber, number, number>;
}, "strip", z.ZodTypeAny, {
    id: number;
    profileId: number;
    title?: string | undefined;
    is_active?: boolean | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    color?: string | undefined;
    completed?: boolean | undefined;
}, {
    profileId: number;
    title?: string | undefined;
    id?: number | undefined;
    is_active?: boolean | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    color?: string | undefined;
    completed?: boolean | undefined;
}>;
declare const taskSchemaCreate: z.ZodObject<z.objectUtil.extendShape<Omit<{
    id: z.ZodEffects<z.ZodOptional<z.ZodNumber>, number, number | undefined>;
    is_active: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    title: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    completed: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
    profileId: z.ZodEffects<z.ZodNumber, number, number>;
}, "id" | "createdAt" | "updatedAt">, {
    title: z.ZodString;
    color: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    title: string;
    color: string;
    profileId: number;
    is_active?: boolean | undefined;
    completed?: boolean | undefined;
}, {
    title: string;
    color: string;
    profileId: number;
    is_active?: boolean | undefined;
    completed?: boolean | undefined;
}>;
declare const taskSchemaCreateClient: z.ZodObject<Omit<z.objectUtil.extendShape<Omit<{
    id: z.ZodEffects<z.ZodOptional<z.ZodNumber>, number, number | undefined>;
    is_active: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    title: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    completed: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
    profileId: z.ZodEffects<z.ZodNumber, number, number>;
}, "id" | "createdAt" | "updatedAt">, {
    title: z.ZodString;
    color: z.ZodString;
}>, "profileId">, "strip", z.ZodTypeAny, {
    title: string;
    color: string;
    is_active?: boolean | undefined;
    completed?: boolean | undefined;
}, {
    title: string;
    color: string;
    is_active?: boolean | undefined;
    completed?: boolean | undefined;
}>;
declare const taskSchemaUpdate: z.ZodObject<{
    id: z.ZodOptional<z.ZodEffects<z.ZodOptional<z.ZodNumber>, number, number | undefined>>;
    is_active: z.ZodOptional<z.ZodOptional<z.ZodDefault<z.ZodBoolean>>>;
    title: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    color: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    completed: z.ZodOptional<z.ZodOptional<z.ZodDefault<z.ZodBoolean>>>;
    createdAt: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
    updatedAt: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
    profileId: z.ZodOptional<z.ZodEffects<z.ZodNumber, number, number>>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    id?: number | undefined;
    is_active?: boolean | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    color?: string | undefined;
    completed?: boolean | undefined;
    profileId?: number | undefined;
}, {
    title?: string | undefined;
    id?: number | undefined;
    is_active?: boolean | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    color?: string | undefined;
    completed?: boolean | undefined;
    profileId?: number | undefined;
}>;
declare const taskSchemaUniqueWhere: z.ZodObject<{
    id: z.ZodNumber;
    profileId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
    profileId: number;
}, {
    id: number;
    profileId: number;
}>;
declare const taskSchemaProfileWhere: z.ZodObject<{
    profileId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    profileId: number;
}, {
    profileId: number;
}>;
declare const tasksSchemaId: z.ZodObject<{
    id: z.ZodEffects<z.ZodNumber, number, number>;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
declare const tasksSchemaProfileId: z.ZodObject<{
    profileId: z.ZodEffects<z.ZodNumber, number, number>;
}, "strip", z.ZodTypeAny, {
    profileId: number;
}, {
    profileId: number;
}>;
declare const taskSchemaDeleteProfileWhere: z.ZodUnion<[z.ZodObject<{
    id: z.ZodNumber;
    profileId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
    profileId: number;
}, {
    id: number;
    profileId: number;
}>, z.ZodObject<{
    profileId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    profileId: number;
}, {
    profileId: number;
}>]>;
declare const taskSchemaFindManyhere: z.ZodObject<{
    profileId: z.ZodNumber;
    is_active: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    profileId: number;
    is_active?: boolean | undefined;
}, {
    profileId: number;
    is_active?: boolean | undefined;
}>;
declare const tasksSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodEffects<z.ZodOptional<z.ZodNumber>, number, number | undefined>;
    is_active: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    title: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    completed: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
    profileId: z.ZodEffects<z.ZodNumber, number, number>;
}, "strip", z.ZodTypeAny, {
    id: number;
    profileId: number;
    title?: string | undefined;
    is_active?: boolean | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    color?: string | undefined;
    completed?: boolean | undefined;
}, {
    profileId: number;
    title?: string | undefined;
    id?: number | undefined;
    is_active?: boolean | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    color?: string | undefined;
    completed?: boolean | undefined;
}>, "many">;

export { taskSchema as default, taskSchema, taskSchemaCreate, taskSchemaCreateClient, taskSchemaDeleteProfileWhere, taskSchemaFindManyhere, taskSchemaProfileWhere, taskSchemaUniqueWhere, taskSchemaUpdate, tasksSchema, tasksSchemaId, tasksSchemaProfileId };
