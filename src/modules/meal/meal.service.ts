import { prisma } from "../../lib/prisma";
import type { CreateMealInput, UpdateMealInput } from "./meal.schema";

export const MealService = {
  async create(userId: string, payload: CreateMealInput) {
    const provider = await prisma.providerProfile.findUnique({
      where: { userId },
    });

    if (!provider) {
      throw new Error("Provider profile not found");
    }

    const category = await prisma.category.findUnique({
      where: { id: payload.categoryId },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    return prisma.meal.create({
      data: {
        ...payload,
        providerId: provider.id,
      },
    });
  },

  async getMeals({
    search,
    category,
    cuisine,
    dietary,
    minPrice,
    maxPrice,
    page = 1,
    limit = 8,
  }: {
    search?: string;
    category?: string;
    page?: number;
    limit?: number;
    cuisine?: string;
    dietary?: string;
    minPrice?: number;
    maxPrice?: number;
  }) {
    const skip = (page - 1) * limit;

    const where: any = {
      isDeleted: false,
      isAvailable: true,
    };

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    if (category) {
      where.category = {
        slug: category,
      };
    }

    if (cuisine) {
      where.cuisine = cuisine;
    }

    if (dietary) {
      where.dietary = dietary;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};

      if (minPrice !== undefined) {
        where.price.gte = Number(minPrice);
      }

      if (maxPrice !== undefined) {
        where.price.lte = Number(maxPrice);
      }
    }

    const [meals, total] = await Promise.all([
      prisma.meal.findMany({
        where,
        include: {
          category: true,

          provider: {
            select: {
              restaurant: true,
            },
          },

          reviews: {
            select: {
              rating: true,
            },
          },

          _count: {
            select: {
              reviews: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },

        skip,
        take: limit,
      }),

      prisma.meal.count({ where }),
    ]);

    const transformedMeals = meals.map((meal) => {
      const totalRating = meal.reviews.reduce(
        (acc, review) => acc + review.rating,
        0,
      );

      const averageRating =
        meal.reviews.length > 0 ? totalRating / meal.reviews.length : 0;

      return {
        ...meal,
        averageRating,
        reviewCount: meal._count.reviews,
      };
    });

    return {
      meals: transformedMeals,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  },

  async getById(id: string) {
    return prisma.meal.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      include: {
        provider: true,

        category: true,

        reviews: {
          include: {
            customer: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },

          orderBy: {
            createdAt: "desc",
          },
        },

        _count: {
          select: {
            reviews: true,
          },
        },
      },
    });
  },

  async update(userId: string, mealId: string, payload: UpdateMealInput) {
    const provider = await prisma.providerProfile.findUnique({
      where: { userId },
    });

    if (!provider) {
      throw new Error("Provider not found");
    }

    const meal = await prisma.meal.findUnique({
      where: { id: mealId },
    });

    if (!meal || meal.providerId !== provider.id) {
      throw new Error("Not allowed");
    }

    return prisma.meal.update({
      where: { id: mealId },
      data: payload,
    });
  },

  async delete(userId: string, mealId: string) {
    const provider = await prisma.providerProfile.findUnique({
      where: { userId },
    });

    if (!provider) {
      throw new Error("Provider not found");
    }

    const meal = await prisma.meal.findUnique({
      where: { id: mealId },
    });

    if (!meal || meal.providerId !== provider.id) {
      throw new Error("Not allowed");
    }

    return prisma.meal.update({
      where: { id: mealId },
      data: {
        isDeleted: true,
      },
    });
  },
};
