import { z } from "zod";

export const taskSchema = z.object({
  id: z
    .number()
    .int()
    .optional()
    .transform((val) => parseInt(`${val}`, 10)),
  is_active: z.boolean().default(true).optional(),
  title: z.string().optional(),
  color: z.string().optional(),
  completed: z.boolean().default(false).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  profileId: z
    .number()
    .int()
    .transform((val) => parseInt(`${val}`, 10)),
});

export const taskSchemaCreate = taskSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    title: z.string(),
    color: z.string(),
  });

export const taskSchemaCreateClient = taskSchemaCreate.omit({
  profileId: true,
});

export const taskSchemaUpdate = taskSchema.partial();

export const taskSchemaUniqueWhere = z.object({
  id: z.number().int(),
  profileId: z.number().int(),
});

export const taskSchemaProfileWhere = z.object({
  profileId: z.number().int(),
});

export const tasksSchemaId = z.object({
  id: z
    .number()
    .int()
    .transform((val) => parseInt(`${val}`, 10)),
});
export const tasksSchemaProfileId = z.object({
  profileId: z
    .number()
    .int()
    .transform((val) => parseInt(`${val}`, 10)),
});

export const taskSchemaDeleteProfileWhere = taskSchemaUniqueWhere.or(
  taskSchemaProfileWhere,
);

export const taskSchemaFindManyhere = z.object({
  profileId: z.number().int(),
  is_active: z.boolean().optional(),
});

export const tasksSchema = z.array(taskSchema);

export default taskSchema;
