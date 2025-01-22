import { handleReadById } from "@/handlers/v1/profiles.hander";
import {
  handleCreate,
  handleRead,
  handleRemove,
  handleUpdate
} from "@/handlers/v1/tasks.handler";
import { logger } from "@/utils";
async function create(req, res) {
  const profileId = Number(req.query && req.query.profileId);
  const result = await logger.errorHandler(
    "tasks.controller.create",
    async ({ profileId: profileId2 }) => {
      const profile = await handleReadById({ id: profileId2 });
      if (!profile) throw new Error("Profile does not exist");
      return await handleCreate({ ...req.body, profileId: profileId2 });
    },
    { profileId },
    "message"
  );
  if (typeof result === "string") {
    res.status(400).json({ error: result });
    return;
  }
  res.status(200).json(result);
  return;
}
async function read(req, res) {
  const profileId = Number(req.query && req.query.profileId);
  const result = await logger.errorHandler(
    "tasks.controller.read",
    async ({ profileId: profileId2 }) => {
      const profile = await handleReadById({ id: profileId2 });
      if (!profile) throw new Error("Profile does not exist");
      return await handleRead({ profileId: profileId2, is_active: true });
    },
    { profileId },
    "message"
  );
  if (typeof result === "string") {
    res.status(400).json({ error: result });
    return;
  }
  res.status(200).json(result);
  return;
}
async function update(req, res) {
  const profileId = Number(req.query && req.query.profileId);
  const id = Number(req.params && req.params.id);
  const result = await logger.errorHandler(
    "tasks.controller.update",
    async ({ id: id2, profileId: profileId2, body }) => {
      const profile = await handleReadById({ id: profileId2 });
      if (!profile) throw new Error("Profile does not exist");
      return await handleUpdate({ id: id2, profileId: profileId2 }, { ...body, id: id2, profileId: profileId2 });
    },
    { id, profileId, body: req.body },
    "message"
  );
  if (typeof result === "string") {
    res.status(400).json({ error: result });
    return;
  }
  res.status(200).json(result);
  return;
}
async function remove(req, res) {
  const profileId = Number(req.query && req.query.profileId);
  const id = Number(req.params && req.params.id);
  const result = await logger.errorHandler(
    "tasks.controller.remove",
    async (where) => {
      const profile = await handleReadById({ id: where.profileId });
      if (!profile) throw new Error("Profile does not exist");
      return await handleRemove(where);
    },
    { id, profileId },
    "message"
  );
  if (typeof result === "string") {
    res.status(400).json({ error: result });
    return;
  }
  res.status(200).json(result);
  return;
}
export {
  create,
  read,
  remove,
  update
};
