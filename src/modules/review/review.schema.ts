import { z } from "zod";

export const createReviewSchema = z.object({
  mealId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().trim().min(3).max(500)
});