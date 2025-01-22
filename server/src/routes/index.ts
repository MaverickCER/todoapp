import { Application } from "express";
import TaskRoutes from "./v1/tasks.routes";

const API_ROOT_PATH = `/api`;

export default function (app: Application): void {
  app.use(`${API_ROOT_PATH}/v1/tasks`, TaskRoutes);
}
