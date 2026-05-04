import { Router } from "express";
import { CategoryController } from "./category.controller";
import { sessionMiddleware } from "../../middlewares/session.middleware";
import { requireRole } from "../../middlewares/role.middleware";
import { validate } from "../../middlewares/validate.middleware";
import {
  createCategorySchema,
  updateCategorySchema
} from "./category.schema";

const router = Router();


router.get("/", CategoryController.getAll);


router.post(
  "/",
  sessionMiddleware,
  requireRole("ADMIN"),
  validate(createCategorySchema),
  CategoryController.create
);

router.patch(
  "/:id",
  sessionMiddleware,
  requireRole("ADMIN"),
  validate(updateCategorySchema),
  CategoryController.update
);

router.delete(
  "/:id",
  sessionMiddleware,
  requireRole("ADMIN"),
  CategoryController.delete
);

export default router;