import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validate } from "../../middlewares/validate.middleware";
import { sessionMiddleware } from "../../middlewares/session.middleware";
import { registerRoleSchema } from "./auth.schema";

const router = Router();

router.post(
  "/register-role",
  sessionMiddleware,
  validate(registerRoleSchema),
  AuthController.registerRole
);

router.get(
  "/me",
  sessionMiddleware,
  AuthController.me
);

export default router;
