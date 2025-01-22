"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var tasks_controller_exports = {};
__export(tasks_controller_exports, {
  create: () => create,
  read: () => read,
  remove: () => remove,
  update: () => update
});
module.exports = __toCommonJS(tasks_controller_exports);
var import_profiles = require("@/handlers/v1/profiles.hander");
var import_tasks = require("@/handlers/v1/tasks.handler");
var import_utils = require("@/utils");
async function create(req, res) {
  const profileId = Number(req.query && req.query.profileId);
  const result = await import_utils.logger.errorHandler(
    "tasks.controller.create",
    async ({ profileId: profileId2 }) => {
      const profile = await (0, import_profiles.handleReadById)({ id: profileId2 });
      if (!profile) throw new Error("Profile does not exist");
      return await (0, import_tasks.handleCreate)({ ...req.body, profileId: profileId2 });
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
  const result = await import_utils.logger.errorHandler(
    "tasks.controller.read",
    async ({ profileId: profileId2 }) => {
      const profile = await (0, import_profiles.handleReadById)({ id: profileId2 });
      if (!profile) throw new Error("Profile does not exist");
      return await (0, import_tasks.handleRead)({ profileId: profileId2, is_active: true });
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
  const result = await import_utils.logger.errorHandler(
    "tasks.controller.update",
    async ({ id: id2, profileId: profileId2, body }) => {
      const profile = await (0, import_profiles.handleReadById)({ id: profileId2 });
      if (!profile) throw new Error("Profile does not exist");
      return await (0, import_tasks.handleUpdate)({ id: id2, profileId: profileId2 }, { ...body, id: id2, profileId: profileId2 });
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
  const result = await import_utils.logger.errorHandler(
    "tasks.controller.remove",
    async (where) => {
      const profile = await (0, import_profiles.handleReadById)({ id: where.profileId });
      if (!profile) throw new Error("Profile does not exist");
      return await (0, import_tasks.handleRemove)(where);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  read,
  remove,
  update
});
