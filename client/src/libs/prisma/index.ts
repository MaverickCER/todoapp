// ---------------------------------------------
// IMPORTANT! NEVER EDIT THIS FILE DIRECTLY
// Please update other models and npm run prisma
// ---------------------------------------------

import { config } from '@/contracts/config.constants';
import { PrismaClient } from '@prisma/client';

// Global variable for Prisma client
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Prisma client instance
export const prisma = globalForPrisma.prisma || new PrismaClient();

// Set global prisma instance in non-production environments
if (config.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export * from './repositories/profile.repository';
export * from './repositories/task.repository';
