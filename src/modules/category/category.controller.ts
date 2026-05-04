import type { RequestHandler } from "express";
import { CategoryService } from "./category.service";

export const CategoryController = {
  create: (async (req, res) => {
    const category = await CategoryService.create(req.body.name);

    res.status(201).json({
      success: true,
      data: category
    });
  }) as RequestHandler,

  getAll: (async (_req, res) => {
    const categories = await CategoryService.getAll();

    res.json({
      success: true,
      data: categories
    });
  }) as RequestHandler,

  update: (async (req, res) => {
    const category = await CategoryService.update(
      req.params.id as string,
      req.body.name
    );

    res.json({
      success: true,
      data: category
    });
  }) as RequestHandler,

  delete: (async (req, res) => {
    await CategoryService.delete(req.params.id as string);

    res.json({
      success: true,
      message: "Category deleted"
    });
  }) as RequestHandler
};