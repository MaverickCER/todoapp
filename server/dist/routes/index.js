import TaskRoutes from "./v1/tasks.routes";
const API_ROOT_PATH = `/api`;
function routes_default(app) {
  app.use(`${API_ROOT_PATH}/v1/tasks`, TaskRoutes);
}
export {
  routes_default as default
};
