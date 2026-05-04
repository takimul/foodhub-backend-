import { Router } from "express";
import { MealController } from "./meal.controller";
import { sessionMiddleware } from "../../middlewares/session.middleware";
import { requireRole } from "../../middlewares/role.middleware";
import { validate } from "../../middlewares/validate.middleware";

import {
  createMealSchema,
  updateMealSchema
} from "./meal.schema";

const router = Router();


router.get("/", MealController.getAll);
router.get("/:id", MealController.getOne);


router.post(
  "/provider",
  sessionMiddleware,
  requireRole("PROVIDER"),
  validate(createMealSchema),
  MealController.create
);

router.patch(
  "/provider/:id",
  sessionMiddleware,
  requireRole("PROVIDER"),
  validate(updateMealSchema),
  MealController.update
);

router.delete(
  "/provider/:id",
  sessionMiddleware,
  requireRole("PROVIDER"),
  MealController.delete
);

export default router;