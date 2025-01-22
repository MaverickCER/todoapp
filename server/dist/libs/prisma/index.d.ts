import * as _prisma_client_runtime_library from '@prisma/client/runtime/library';
import * as _prisma_client from '.prisma/client';
import { PrismaClient } from '@prisma/client';
export { profileRepository } from './repositories/profile.repository.js';
export { taskRepository } from './repositories/task.repository.js';
import '../zod/types/profile.type.js';
import 'zod';
import '../zod/schemas/profile.schema.js';
import '../zod/types/task.type.js';
import '../zod/schemas/task.schema.js';

declare const prisma: PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client_runtime_library.DefaultArgs>;

export { prisma };
