import type { RequestHandler } from "express";
import type { AuthenticatedRequest } from "../../types/auth-request";
import { OrderService } from "./order.service";

export const OrderController = {
  create: (async (req, res) => {
    const authReq = req as AuthenticatedRequest;

    const data = await OrderService.create(authReq.user.id, req.body);

    res.status(201).json({
      success: true,
      data,
    });
  }) as RequestHandler,

  myOrders: (async (req, res) => {
    const authReq = req as AuthenticatedRequest;

    const data = await OrderService.getMyOrders(authReq.user.id);

    res.json({ success: true, data });
  }) as RequestHandler,

  getOne: (async (req, res) => {
    const authReq = req as AuthenticatedRequest;

    const data = await OrderService.getById(authReq.user.id, req.params.id as string);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      data,
    });
  }) as RequestHandler,

  providerOrders: (async (req, res) => {
    const authReq = req as AuthenticatedRequest;

    const data = await OrderService.getProviderOrders(authReq.user.id);

    res.json({ success: true, data });
  }) as RequestHandler,

  updateStatus: (async (req, res) => {
    const authReq = req as AuthenticatedRequest;

    const data = await OrderService.updateStatus(
      authReq.user.id,
      req.params.id as string,
      req.body.status,
    );

    res.json({ success: true, data });
  }) as RequestHandler,
};
