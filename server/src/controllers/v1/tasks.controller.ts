import { handleReadById } from "@/handlers/v1/profiles.hander";
import {
  handleCreate,
  handleRead,
  handleRemove,
  handleUpdate,
} from "@/handlers/v1/tasks.handler";
import { logger } from "@/utils";
import { TTask } from "@/zod";
import { GetBatchResult } from "@prisma/client/runtime/library";
import { Request, Response } from "express";

async function create(req: Request, res: Response): Promise<void> {
  const profileId = Number(req.query && req.query.profileId);
  const result = await logger.errorHandler(
    "tasks.controller.create",
    async ({ profileId }): Promise<"message" | TTask> => {
      const profile = await handleReadById({ id: profileId });
      if (!profile) throw new Error("Profile does not exist");
      return await handleCreate({ ...req.body, profileId });
    },
    { profileId },
    "message",
  );
  if (typeof result === "string") {
    res.status(400).json({ error: result });
    return;
  }
  res.status(200).json(result);
  return;
}

async function read(req: Request, res: Response): Promise<void> {
  const profileId = Number(req.query && req.query.profileId);
  const result = await logger.errorHandler(
    "tasks.controller.read",
    async ({ profileId }): Promise<"message" | TTask[]> => {
      const profile = await handleReadById({ id: profileId });
      if (!profile) throw new Error("Profile does not exist");
      return await handleRead({ profileId, is_active: true });
    },
    { profileId },
    "message",
  );
  if (typeof result === "string") {
    res.status(400).json({ error: result });
    return;
  }
  res.status(200).json(result);
  return;
}

async function update(req: Request, res: Response): Promise<void> {
  const profileId = Number(req.query && req.query.profileId);
  const id = Number(req.params && req.params.id);
  const result = await logger.errorHandler(
    "tasks.controller.update",
    async ({ id, profileId, body }): Promise<"message" | TTask> => {
      const profile = await handleReadById({ id: profileId });
      if (!profile) throw new Error("Profile does not exist");
      return await handleUpdate({ id, profileId }, { ...body, id, profileId });
    },
    { id, profileId, body: req.body },
    "message",
  );

  if (typeof result === "string") {
    res.status(400).json({ error: result });
    return;
  }
  res.status(200).json(result);
  return;
}

async function remove(req: Request, res: Response): Promise<void> {
  const profileId = Number(req.query && req.query.profileId);
  const id = Number(req.params && req.params.id);
  const result = await logger.errorHandler(
    "tasks.controller.remove",
    async (where): Promise<"message" | GetBatchResult> => {
      const profile = await handleReadById({ id: where.profileId });
      if (!profile) throw new Error("Profile does not exist");
      return await handleRemove(where);
    },
    { id, profileId },
    "message",
  );

  if (typeof result === "string") {
    res.status(400).json({ error: result });
    return;
  }
  res.status(200).json(result);
  return;
}

export { create, read, remove, update };
