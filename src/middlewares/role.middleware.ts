import type { Request, Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../types/auth-request";
// import type { UserRole } from "../../generated/prisma/client";
import type { UserRole } from "../generated/prisma/client.js";

export const requireRole =
  (...roles: UserRole[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthenticatedRequest;

    if (!roles.includes(authReq.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden"
      });
    }

    next();
  };