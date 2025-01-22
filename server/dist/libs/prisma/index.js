import { config } from "@/contracts/config.constants";
import { PrismaClient } from "@prisma/client";
const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (config.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export * from "./repositories/profile.repository";
export * from "./repositories/task.repository";
export {
  prisma
};
