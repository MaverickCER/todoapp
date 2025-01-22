import { z } from "zod";
import { taskSchema, tasksSchema } from "../schemas";

export type TTask = z.infer<typeof taskSchema>;
export type TTasks = z.infer<typeof tasksSchema>;
