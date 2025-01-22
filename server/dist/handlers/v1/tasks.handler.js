import { taskRepository } from "@/prisma/repositories/task.repository";
async function handleCreate(data) {
  return await taskRepository.create(data);
}
async function handleRead(data) {
  return await taskRepository.findMany(data);
}
async function handleUpdate(where, data) {
  return await taskRepository.update(where, data);
}
async function handleRemove(where) {
  if (where.id === 0)
    return await taskRepository.delete({ profileId: where.profileId });
  return await taskRepository.delete(where);
}
export {
  handleCreate,
  handleRead,
  handleRemove,
  handleUpdate
};
