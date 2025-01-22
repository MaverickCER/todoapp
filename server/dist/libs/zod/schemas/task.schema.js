import { z } from "zod";
const taskSchema = z.object({
  id: z.number().int().optional().transform((val) => parseInt(`${val}`, 10)),
  is_active: z.boolean().default(true).optional(),
  title: z.string().optional(),
  color: z.string().optional(),
  completed: z.boolean().default(false).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  profileId: z.number().int().transform((val) => parseInt(`${val}`, 10))
});
const taskSchemaCreate = taskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
}).extend({
  title: z.string(),
  color: z.string()
});
const taskSchemaCreateClient = taskSchemaCreate.omit({
  profileId: true
});
const taskSchemaUpdate = taskSchema.partial();
const taskSchemaUniqueWhere = z.object({
  id: z.number().int(),
  profileId: z.number().int()
});
const taskSchemaProfileWhere = z.object({
  profileId: z.number().int()
});
const tasksSchemaId = z.object({
  id: z.number().int().transform((val) => parseInt(`${val}`, 10))
});
const tasksSchemaProfileId = z.object({
  profileId: z.number().int().transform((val) => parseInt(`${val}`, 10))
});
const taskSchemaDeleteProfileWhere = taskSchemaUniqueWhere.or(
  taskSchemaProfileWhere
);
const taskSchemaFindManyhere = z.object({
  profileId: z.number().int(),
  is_active: z.boolean().optional()
});
const tasksSchema = z.array(taskSchema);
var task_schema_default = taskSchema;
export {
  task_schema_default as default,
  taskSchema,
  taskSchemaCreate,
  taskSchemaCreateClient,
  taskSchemaDeleteProfileWhere,
  taskSchemaFindManyhere,
  taskSchemaProfileWhere,
  taskSchemaUniqueWhere,
  taskSchemaUpdate,
  tasksSchema,
  tasksSchemaId,
  tasksSchemaProfileId
};
