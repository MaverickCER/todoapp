import { z } from 'zod';
import profileSchema from '../schemas/profile.schema.js';

type TProfile = z.infer<typeof profileSchema>;

export type { TProfile };
