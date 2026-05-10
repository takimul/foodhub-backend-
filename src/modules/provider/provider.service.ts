import { prisma } from "../../lib/prisma";
import type {
  CreateProviderInput,
  UpdateProviderInput,
} from "./provider.schema";

export const ProviderService = {
  async create(userId: string, payload: CreateProviderInput) {
    const existing = await prisma.providerProfile.findUnique({
      where: { userId },
    });

    if (existing) {
      throw new Error("Provider profile already exists");
    }

    return prisma.providerProfile.create({
      data: {
        userId,
        ...payload,
      },
    });
  },

  async getMe(userId: string) {
    return prisma.providerProfile.findUnique({
      where: { userId },

      include: {
        meals: {
          include: {
            reviews: {
              select: {
                id: true,
                rating: true,
                comment: true,
                createdAt: true,

                customer: {
                  select: {
                    name: true,
                    image: true,
                  },
                },
              },

              orderBy: {
                createdAt: "desc",
              },
            },
          },
        },
      },
    });
  },

  async update(userId: string, payload: UpdateProviderInput) {
    return prisma.providerProfile.update({
      where: { userId },
      data: payload,
    });
  },

  async getAll() {
    return prisma.providerProfile.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
  },

  async getById(id: string) {
    return prisma.providerProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        meals: {
          include: {
            reviews: {
              select: {
                id: true,
                rating: true,
                comment: true,
                createdAt: true,

                customer: {
                  select: {
                    name: true,
                    image: true,
                  },
                },
              },

              orderBy: {
                createdAt: "desc",
              },
            },
          },
        },
      },
    });
  },
};
