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
var tasks_handler_exports = {};
__export(tasks_handler_exports, {
  handleCreate: () => handleCreate,
  handleRead: () => handleRead,
  handleRemove: () => handleRemove,
  handleUpdate: () => handleUpdate
});
module.exports = __toCommonJS(tasks_handler_exports);
var import_task = require("@/prisma/repositories/task.repository");
async function handleCreate(data) {
  return await import_task.taskRepository.create(data);
}
async function handleRead(data) {
  return await import_task.taskRepository.findMany(data);
}
async function handleUpdate(where, data) {
  return await import_task.taskRepository.update(where, data);
}
async function handleRemove(where) {
  if (where.id === 0)
    return await import_task.taskRepository.delete({ profileId: where.profileId });
  return await import_task.taskRepository.delete(where);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleCreate,
  handleRead,
  handleRemove,
  handleUpdate
});
