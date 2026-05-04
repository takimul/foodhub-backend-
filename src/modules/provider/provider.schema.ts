import { z } from "zod";

export const createProviderSchema = z.object({
  restaurant: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  address: z.string().min(5),
  phone: z.string().min(6).max(20).optional(),
  logoUrl: z.string().url().optional()
});

export const updateProviderSchema =
  createProviderSchema.partial();

export type CreateProviderInput = z.infer<typeof createProviderSchema>;
export type UpdateProviderInput = z.infer<typeof updateProviderSchema>;