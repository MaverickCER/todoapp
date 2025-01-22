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
export {
  parseDates_default as default,
  parseDates
};
