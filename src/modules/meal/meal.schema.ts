import { z } from "zod";

export const createMealSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(5).max(500),
  price: z.number().positive(),
  categoryId: z.string(),
  imageUrl: z.string().url().optional()
});

export const updateMealSchema = createMealSchema.partial();

export type CreateMealInput = z.infer<typeof createMealSchema>;
export type UpdateMealInput = z.infer<typeof updateMealSchema>;