import { z } from 'zod';
import taskSchema, { tasksSchema } from '../schemas/task.schema.cjs';

type TTask = z.infer<typeof taskSchema>;
type TTasks = z.infer<typeof tasksSchema>;

export type { TTask, TTasks };
