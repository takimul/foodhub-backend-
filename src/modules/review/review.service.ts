import { prisma } from "../../lib/prisma";

export const ReviewService = {
  async createReview(
    customerId: string,
    payload: {
      orderId: string;
      mealId: string;
      rating: number;
      comment: string;
    },
  ) {
    // CHECK ORDER EXIST
    const order = await prisma.order.findFirst({
      where: {
        id: payload.orderId,
        customerId,
        status: "DELIVERED",

        items: {
          some: {
            mealId: payload.mealId,
          },
        },
      },
    });

    if (!order) {
      throw new Error("Invalid order");
    }

    // CHECK EXISTING REVIEW
    const existing = await prisma.review.findFirst({
      where: {
        orderId: payload.orderId,

        mealId: payload.mealId,

        customerId,
      },
    });

    if (existing) {
      throw new Error("You already reviewed this order");
    }

    return prisma.review.create({
      data: {
        orderId: payload.orderId,

        mealId: payload.mealId,

        customerId,

        rating: payload.rating,

        comment: payload.comment,
      },

      include: {
        customer: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
  },

  async getMealReviews(mealId: string) {
    return prisma.review.findMany({
      where: {
        mealId,
      },
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
    });
  },
};
