import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import type { RegisterRoleInput } from "./auth.schema";

export const AuthController = {

  async registerRole(
    req: Request<{}, {}, RegisterRoleInput>,
    res: Response
  ) {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updated = await AuthService.setUserRole(
      req.user.id,
      req.body.role
    );

    return res.json({
      message: "Role updated",
      user: updated
    });
  },

  async me(req: Request, res: Response) {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await AuthService.getMe(req.user.id);
    return res.json(user);
  }
};
