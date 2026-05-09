import { Router } from "express";
import { ReviewController } from "./review.controller";
import { sessionMiddleware } from "../../middlewares/session.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createReviewSchema } from "./review.schema";

const router = Router();

router.post(
  "/",
  sessionMiddleware,
  validate(createReviewSchema),
  ReviewController.create
);

router.get(
  "/meal/:mealId",
  ReviewController.getMealReviews
);

export default router;