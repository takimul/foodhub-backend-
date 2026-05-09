import { prisma } from "../../lib/prisma";

export const ReviewService = {
  async createReview(
    customerId: string,
    payload: {
      mealId: string;
      rating: number;
      comment: string;
    }
  ) {
    // CHECK PURCHASE
    const hasOrdered = await prisma.orderItem.findFirst({
      where: {
        mealId: payload.mealId,
        order: {
          customerId,
          status: "DELIVERED"
        }
      }
    });

    if (!hasOrdered) {
      throw new Error(
        "You can only review meals you ordered"
      );
    }

    
    const existing = await prisma.review.findUnique({
      where: {
        mealId_customerId: {
          mealId: payload.mealId,
          customerId
        }
      }
    });

    if (existing) {
      throw new Error("Review already exists");
    }

    return prisma.review.create({
      data: {
        mealId: payload.mealId,
        customerId,
        rating: payload.rating,
        comment: payload.comment
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      }
    });
  },

  async getMealReviews(mealId: string) {
    return prisma.review.findMany({
      where: {
        mealId
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }
};