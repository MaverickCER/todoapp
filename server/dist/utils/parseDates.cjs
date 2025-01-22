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
var parseDates_exports = {};
__export(parseDates_exports, {
  default: () => parseDates_default,
  parseDates: () => parseDates
});
module.exports = __toCommonJS(parseDates_exports);
const parseDates = (tasks) => {
  if (!tasks || typeof tasks !== "object") return tasks;
  if (Array.isArray(tasks)) {
    return tasks.map((task) => {
      return Object.entries(task).reduce(
        (acc, [key, value]) => {
          const date = /* @__PURE__ */ new Date(`${value}`);
          if (isNaN(date.getTime()) || key.toLowerCase().includes("id")) {
            acc[key] = value;
          } else {
            acc[key] = date;
          }
          return acc;
        },
        {}
      );
    });
  }
  return Object.entries(tasks).reduce(
    (acc, [key, value]) => {
      const date = /* @__PURE__ */ new Date(`${value}`);
      if (isNaN(date.getTime()) || key.toLowerCase().includes("id")) {
        acc[key] = value;
      } else {
        acc[key] = date;
      }
      return acc;
    },
    {}
  );
};
var parseDates_default = parseDates;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parseDates
});
