import type { RequestHandler } from "express";
import type { AuthenticatedRequest } from "../../types/auth-request";
import { MealService } from "./meal.service";

export const MealController = {
  create: (async (req, res) => {
    const authReq = req as AuthenticatedRequest;

    const data = await MealService.create(
      authReq.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      data
    });
  }) as RequestHandler,

  getAll: (async (_req, res) => {
    const data = await MealService.getAll();

    res.json({
      success: true,
      data
    });
  }) as RequestHandler,

  getOne: (async (req, res) => {
    const data = await MealService.getById(req.params.id as string);

    res.json({
      success: true,
      data
    });
  }) as RequestHandler,

  update: (async (req, res) => {
    const authReq = req as AuthenticatedRequest;

    const data = await MealService.update(
      authReq.user.id,
      req.params.id as string,
      req.body
    );

    res.json({
      success: true,
      data
    });
  }) as RequestHandler,

  delete: (async (req, res) => {
    const authReq = req as AuthenticatedRequest;

    await MealService.delete(
      authReq.user.id,
      req.params.id as string
    );

    res.json({
      success: true,
      message: "Meal deleted"
    });
  }) as RequestHandler
};