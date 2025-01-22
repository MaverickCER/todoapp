import { z } from "zod";
import { profileSchema } from "../schemas";

export type TProfile = z.infer<typeof profileSchema>;
