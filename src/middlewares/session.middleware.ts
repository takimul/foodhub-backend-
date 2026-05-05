import type { Request, Response, NextFunction } from "express";
// import { auth } from "../lib/auth";
import { getAuth } from "../lib/auth";
// import type { UserRole } from "../../generated/prisma/client";
import type { UserRole } from "../generated/prisma/client.js";
import type { AuthenticatedRequest } from "../types/auth-request";

function toWebHeaders(headers: Request["headers"]): Headers {
  const h = new Headers();

  for (const [key, value] of Object.entries(headers)) {
    if (typeof value === "string") h.set(key, value);
    else if (Array.isArray(value)) h.set(key, value.join(","));
  }

  return h;
}

function parseUserRole(role: string): UserRole {
  const allowed: UserRole[] = ["CUSTOMER", "PROVIDER", "ADMIN"];

  return allowed.includes(role as UserRole)
    ? (role as UserRole)
    : "CUSTOMER";
}

// export async function sessionMiddleware(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const session = await auth.api.getSession({
//     headers: toWebHeaders(req.headers)
//   });

//   if (!session) {
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorized"
//     });
//   }

//   (req as AuthenticatedRequest).user = {
//     id: session.user.id,
//     email: session.user.email,
//     role: parseUserRole(session.user.role)
//   };

//   next();
// }
export async function sessionMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = await getAuth();

  const session = await auth.api.getSession({
    headers: toWebHeaders(req.headers)
  });

  if (!session) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }

  (req as any).user = {
    id: session.user.id,
    email: session.user.email,
    role: session.user.role?.toUpperCase?.() || "CUSTOMER"
  };

  next();
}