import type { RequestHandler } from "express";
import type { AuthenticatedRequest } from "../../types/auth-request";
import { ReviewService } from "./review.service";

export const ReviewController = {
  create: (async (req, res) => {
    const authReq = req as AuthenticatedRequest;

    const data = await ReviewService.createReview(
      authReq.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Review added",
      data
    });
  }) as RequestHandler,

  getMealReviews: (async (req, res) => {
    const data =
      await ReviewService.getMealReviews(
        req.params.mealId as string
      );

    res.json({
      success: true,
      data
    });
  }) as RequestHandler
};