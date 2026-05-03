import type { RequestHandler } from "express";
import type { AuthenticatedRequest } from "../../types/auth-request";
import { AuthService } from "./auth.service";

export const AuthController = {
  me: (async (req, res) => {
    const user = await AuthService.getMe(
      (req as AuthenticatedRequest).user.id
    );

    res.json({
      success: true,
      data: user
    });
  }) as RequestHandler,

  becomeProvider: (async (req, res) => {
    const updated = await AuthService.setUserRole(
      (req as AuthenticatedRequest).user.id,
      "PROVIDER"
    );

    res.json({
      success: true,
      message: "Now you are provider",
      data: updated
    });
  }) as RequestHandler,

  updateProfile: (async (req, res) => {
    const authReq = req as AuthenticatedRequest;

    const updated = await AuthService.updateProfile(
      authReq.user.id,
      req.body
    );

    res.json({
      success: true,
      message: "Profile updated",
      data: updated
    });
  }) as RequestHandler
};