import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  const message =
    err instanceof Error ? err.message : "Server error";

  res.status(500).json({
    message
  });
};
