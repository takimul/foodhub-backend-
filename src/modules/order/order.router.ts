import { Router } from "express";
import { OrderController } from "./order.controller";
import { sessionMiddleware } from "../../middlewares/session.middleware";
import { requireRole } from "../../middlewares/role.middleware";
import { validate } from "../../middlewares/validate.middleware";
import {
  createOrderSchema,
  updateOrderStatusSchema
} from "./order.schema";

const router = Router();

router.post(
  "/",
  sessionMiddleware,
  requireRole("CUSTOMER"),
  validate(createOrderSchema),
  OrderController.create
);

router.get(
  "/",
  sessionMiddleware,
  requireRole("CUSTOMER"),
  OrderController.myOrders
);

router.get(
  "/provider",
  sessionMiddleware,
  requireRole("PROVIDER"),
  OrderController.providerOrders
);

router.get(
  "/:id",
  sessionMiddleware,
  requireRole("CUSTOMER"),
  OrderController.getOne
);



router.patch(
  "/provider/:id",
  sessionMiddleware,
  requireRole("PROVIDER"),
  validate(updateOrderStatusSchema),
  OrderController.updateStatus
);

export default router;