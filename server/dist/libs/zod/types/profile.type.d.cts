import { z } from 'zod';
import profileSchema from '../schemas/profile.schema.cjs';

type TProfile = z.infer<typeof profileSchema>;

export type { TProfile };
