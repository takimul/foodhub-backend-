import { Router } from "express";
import { AuthController } from "./auth.controller";
import { sessionMiddleware } from "../../middlewares/session.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { updateProfileSchema } from "./auth.schema";

const router = Router();

router.get("/me", sessionMiddleware, AuthController.me);

router.patch(
  "/become-provider",
  sessionMiddleware,
  AuthController.becomeProvider
);

router.patch(
  "/profile",
  sessionMiddleware,
  validate(updateProfileSchema),
  AuthController.updateProfile
);

export default router;