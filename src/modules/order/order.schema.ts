import { z } from "zod";

export const createOrderSchema = z.object({
  items: z.array(
    z.object({
      mealId: z.string(),
      quantity: z.number().min(1)
    })
  ),
  deliveryAddress: z.string().min(5)
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export const updateOrderStatusSchema = z.object({
  status: z.enum([
    "PLACED",
    "PREPARING",
    "READY",
    "DELIVERED",
    "CANCELLED"
  ])
});