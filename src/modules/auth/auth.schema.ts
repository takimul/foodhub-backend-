import { z } from "zod";

export const registerRoleSchema = z.object({
  role: z.enum(["CUSTOMER", "PROVIDER"])
});

export type RegisterRoleInput = z.infer<typeof registerRoleSchema>;
