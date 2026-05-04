import { Router } from "express";
import { ProviderController } from "./provider.controller";
import { sessionMiddleware } from "../../middlewares/session.middleware";
import { requireRole } from "../../middlewares/role.middleware";
import { validate } from "../../middlewares/validate.middleware";

import {
  createProviderSchema,
  updateProviderSchema
} from "./provider.schema";

const router = Router();


router.get("/", ProviderController.getAll);
router.get(
  "/me",
  sessionMiddleware,
  requireRole("PROVIDER"),
  ProviderController.me
);
router.get("/:id", ProviderController.getOne);


router.post(
  "/",
  sessionMiddleware,
  requireRole("PROVIDER"),
  validate(createProviderSchema),
  ProviderController.create
);



router.patch(
  "/",
  sessionMiddleware,
  requireRole("PROVIDER"),
  validate(updateProviderSchema),
  ProviderController.update
);

export default router;