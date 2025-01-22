import * as _prisma_client_runtime_library from '@prisma/client/runtime/library';
import * as _prisma_client from '.prisma/client';
import { PrismaClient } from '@prisma/client';
export { profileRepository } from './repositories/profile.repository.cjs';
export { taskRepository } from './repositories/task.repository.cjs';
import '../zod/types/profile.type.cjs';
import 'zod';
import '../zod/schemas/profile.schema.cjs';
import '../zod/types/task.type.cjs';
import '../zod/schemas/task.schema.cjs';

declare const prisma: PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client_runtime_library.DefaultArgs>;

export { prisma };
