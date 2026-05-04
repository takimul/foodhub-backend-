import type { RequestHandler } from "express";
import { AdminService } from "./admin.service";

export const AdminController = {
  getUsers: (async (_req, res) => {
    const users = await AdminService.getAllUsers();

    res.json({
      success: true,
      data: users
    });
  }) as RequestHandler,

  updateStatus: (async (req, res) => {
    const user = await AdminService.updateUserStatus(
      req.params.id as string,
      req.body.status
    );

    res.json({
      success: true,
      message: "User updated",
      data: user
    });
  }) as RequestHandler,

  getOrders: (async (_req, res) => {
  const orders = await AdminService.getAllOrders();

  res.json({
    success: true,
    data: orders
  });
}) as RequestHandler,

dashboard: (async (_req, res) => {
  const stats = await AdminService.getDashboardStats();

  res.json({
    success: true,
    data: stats
  });
}) as RequestHandler,
};