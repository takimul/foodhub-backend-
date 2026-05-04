import { Router } from "express";
import { AdminController } from "./admin.controller";
import { sessionMiddleware } from "../../middlewares/session.middleware";
import { requireRole } from "../../middlewares/role.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { updateUserStatusSchema } from "./admin.schema";

const router = Router();

router.get(
  "/users",
  sessionMiddleware,
  requireRole("ADMIN"),
  AdminController.getUsers
);

router.patch(
  "/users/:id",
  sessionMiddleware,
  requireRole("ADMIN"),
  validate(updateUserStatusSchema),
  AdminController.updateStatus
);


router.get(
  "/orders",
  sessionMiddleware,
  requireRole("ADMIN"),
  AdminController.getOrders
);


router.get(
  "/dashboard",
  sessionMiddleware,
  requireRole("ADMIN"),
  AdminController.dashboard
);

export default router;