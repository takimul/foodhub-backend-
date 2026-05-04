import { prisma } from "../../lib/prisma";
import type {
  CreateMealInput,
  UpdateMealInput
} from "./meal.schema";

export const MealService = {
  async create(userId: string, payload: CreateMealInput) {
    const provider = await prisma.providerProfile.findUnique({
      where: { userId }
    });

    if (!provider) {
      throw new Error("Provider profile not found");
    }

    const category = await prisma.category.findUnique({
      where: { id: payload.categoryId }
    });

    if (!category) {
      throw new Error("Category not found");
    }

    return prisma.meal.create({
      data: {
        ...payload,
        providerId: provider.id
      }
    });
  },

  async getAll() {
    return prisma.meal.findMany({
      where: {
        isDeleted: false
      },
      include: {
        provider: {
          select: {
            restaurant: true
          }
        },
        category: true
      }
    });
  },

  async getById(id: string) {
    return prisma.meal.findFirst({
      where: {
        id,
        isDeleted: false
      },
      include: {
        provider: true,
        category: true
      }
    });
  },

  async update(
    userId: string,
    mealId: string,
    payload: UpdateMealInput
  ) {
    const provider = await prisma.providerProfile.findUnique({
      where: { userId }
    });

    if (!provider) {
      throw new Error("Provider not found");
    }

    const meal = await prisma.meal.findUnique({
      where: { id: mealId }
    });

    if (!meal || meal.providerId !== provider.id) {
      throw new Error("Not allowed");
    }

    return prisma.meal.update({
      where: { id: mealId },
      data: payload
    });
  },

  async delete(userId: string, mealId: string) {
    const provider = await prisma.providerProfile.findUnique({
      where: { userId }
    });

    if (!provider) {
      throw new Error("Provider not found");
    }

    const meal = await prisma.meal.findUnique({
      where: { id: mealId }
    });

    if (!meal || meal.providerId !== provider.id) {
      throw new Error("Not allowed");
    }

    return prisma.meal.update({
      where: { id: mealId },
      data: {
        isDeleted: true
      }
    });
  }
};