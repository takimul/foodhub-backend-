import type { RequestHandler } from "express";
import type { AuthenticatedRequest } from "../../types/auth-request";
import { ProviderService } from "./provider.service";

export const ProviderController = {
  create: (async (req, res) => {
    const authReq = req as AuthenticatedRequest;

    const data = await ProviderService.create(
      authReq.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Provider profile created",
      data
    });
  }) as RequestHandler,

  me: (async (req, res) => {
    const authReq = req as AuthenticatedRequest;

    const data = await ProviderService.getMe(authReq.user.id);

    res.json({
      success: true,
      data
    });
  }) as RequestHandler,

  update: (async (req, res) => {
    const authReq = req as AuthenticatedRequest;

    const data = await ProviderService.update(
      authReq.user.id,
      req.body
    );

    res.json({
      success: true,
      message: "Provider updated",
      data
    });
  }) as RequestHandler,

  getAll: (async (_req, res) => {
    const data = await ProviderService.getAll();

    res.json({
      success: true,
      data
    });
  }) as RequestHandler,

  getOne: (async (req, res) => {
    const data = await ProviderService.getById(req.params.id as string);

    res.json({
      success: true,
      data
    });
  }) as RequestHandler
};