import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(50).optional(),

  phone: z.string().min(6).max(20).optional(),

  image: z.string().url().optional()
});

export type UpdateProfileInput =
  z.infer<typeof updateProfileSchema>;