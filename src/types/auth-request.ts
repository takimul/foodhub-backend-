import type { Request } from "express";
import type { UserRole } from "../generated/prisma/client.js";

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    role: UserRole;
  };
}