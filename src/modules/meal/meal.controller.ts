import type { RequestHandler } from "express";
import type { AuthenticatedRequest } from "../../types/auth-request";
import { MealService } from "./meal.service";

export const MealController = {
  create: (async (req, res) => {
    try {
      const authReq = req as AuthenticatedRequest;

      const data = await MealService.create(authReq.user.id, req.body);

      res.status(201).json({
        success: true,
        data,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }) as RequestHandler,

  getAll: (async (req, res) => {
    try {
      const {
        search,
        category,
        cuisine,
        dietary,
        minPrice,
        maxPrice,
        page,
        limit,
      } = req.query;

      const result = await MealService.getMeals({
        search: search as string,
        category: category as string,
        cuisine: cuisine as string,

        dietary: dietary as string,
        minPrice: minPrice ? Number(minPrice) : undefined,

        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        page: Number(page) || 1,
        limit: Number(limit) || 8,
      });

      res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }) as RequestHandler,

  getOne: (async (req, res) => {
    try {
      const data = await MealService.getById(req.params.id as string);

      res.json({
        success: true,
        data,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }) as RequestHandler,

  update: (async (req, res) => {
    try {
      const authReq = req as AuthenticatedRequest;

      const data = await MealService.update(
        authReq.user.id,
        req.params.id as string,
        req.body,
      );

      res.json({
        success: true,
        data,
      });
    } catch (error: any) {
      res.status(403).json({
        success: false,
        message: error.message,
      });
    }
  }) as RequestHandler,

  delete: (async (req, res) => {
    try {
      const authReq = req as AuthenticatedRequest;

      await MealService.delete(authReq.user.id, req.params.id as string);

      res.json({
        success: true,
        message: "Meal deleted",
      });
    } catch (error: any) {
      res.status(403).json({
        success: false,
        message: error.message,
      });
    }
  }) as RequestHandler,
};
