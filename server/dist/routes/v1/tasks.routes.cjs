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
var tasks_routes_exports = {};
__export(tasks_routes_exports, {
  default: () => tasks_routes_default
});
module.exports = __toCommonJS(tasks_routes_exports);
var import_express = require("express");
var import_tasks = require("../../controllers/v1/tasks.controller");
const router = (0, import_express.Router)();
router.get("/", import_tasks.read);
router.post("/", import_tasks.create);
router.put("/:id", import_tasks.update);
router.delete("/:id", import_tasks.remove);
var tasks_routes_default = router;
