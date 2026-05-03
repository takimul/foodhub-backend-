import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../types/auth-request";
import type { UserRole } from "../../generated/prisma/client";

export const requireRole =
  (...roles: UserRole[]) =>
  (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden"
      });
    }

    next();
  };