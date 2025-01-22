import { Router } from "express";
import {
  create,
  read,
  remove,
  update,
} from "../../controllers/v1/tasks.controller";

const router = Router();

router.get("/", read);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
