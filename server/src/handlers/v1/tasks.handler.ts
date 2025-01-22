import { taskRepository } from "@/prisma/repositories/task.repository";
import { TTask } from "@/zod";
import { GetBatchResult } from "@prisma/client/runtime/library";

async function handleCreate(data: Partial<TTask>): Promise<TTask> {
  return await taskRepository.create(data);
}

async function handleRead(data: Partial<TTask>): Promise<TTask[]> {
  return await taskRepository.findMany(data);
}

async function handleUpdate(
  where: { id: number; profileId: number },
  data: Partial<TTask>,
): Promise<TTask> {
  return await taskRepository.update(where, data);
}

async function handleRemove(where: {
  id: number;
  profileId: number;
}): Promise<GetBatchResult> {
  if (where.id === 0)
    return await taskRepository.delete({ profileId: where.profileId });
  return await taskRepository.delete(where);
}

export { handleCreate, handleRead, handleRemove, handleUpdate };
