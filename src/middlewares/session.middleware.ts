import type { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import type { UserRole } from "../../generated/prisma/client";

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

  if (allowed.includes(role as UserRole)) {
    return role as UserRole;
  }

  return "CUSTOMER";
}

export async function sessionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = await auth.api.getSession({
    headers: toWebHeaders(req.headers)
  });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = {
    id: session.user.id,
    email: session.user.email,
    role: parseUserRole(session.user.role)
  };

  next();
}
