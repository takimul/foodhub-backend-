import { prisma } from "../../lib/prisma";
import type { CreateOrderInput } from "./order.schema";

export const OrderService = {
  async create(userId: string, payload: CreateOrderInput) {
    let totalAmount = 0;
    let providerId: string | null = null;

    const itemsData = [];

    for (const item of payload.items) {
      const meal = await prisma.meal.findUnique({
        where: { id: item.mealId },
      });

      if (!meal || meal.isDeleted) {
        throw new Error("Invalid meal");
      }

      totalAmount += meal.price * item.quantity;

      providerId = meal.providerId;

      itemsData.push({
        mealId: meal.id,
        quantity: item.quantity,
        price: meal.price,
      });
    }

    if (!providerId) {
      throw new Error("Provider not found");
    }

    return prisma.order.create({
      data: {
        customerId: userId,
        providerId,
        deliveryAddress: payload.deliveryAddress,
        totalAmount,
        items: {
          create: itemsData,
        },
      },
      include: {
        items: true,
      },
    });
  },

  async getMyOrders(userId: string) {
    return prisma.order.findMany({
      where: { customerId: userId },
      include: {
        items: {
          include: {
            meal: {
              include: {
                reviews: {
                  where: {
                    customerId: userId,
                  },
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  },

  async getById(userId: string, id: string) {
    return prisma.order.findFirst({
      where: {
        id,
        customerId: userId,
      },
      include: {
        items: {
          include: {
            meal: {
              include: {
                reviews: {
                  where: {
                    customerId: userId,
                  },
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  },

  async getProviderOrders(userId: string) {
    const provider = await prisma.providerProfile.findUnique({
      where: { userId },
    });

    if (!provider) throw new Error("Provider not found");

    return prisma.order.findMany({
      where: { providerId: provider.id },
      include: {
        items: {
          include: {
            meal: {
              include: {
                reviews: {
                  select: {
                    id: true,
                    rating: true,
                  },
                },
              },
            },
          },
        },
        customer: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });
  },

  async updateStatus(userId: string, orderId: string, status: any) {
    const provider = await prisma.providerProfile.findUnique({
      where: { userId },
    });

    if (!provider) throw new Error("Provider not found");

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order || order.providerId !== provider.id) {
      throw new Error("Not allowed");
    }

    return prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  },
};
