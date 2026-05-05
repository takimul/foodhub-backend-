import { UserStatus } from "../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma";

export const AdminService = {
  async getAllUsers() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true
      }
    });
  },

  async updateUserStatus(userId: string, status: UserStatus) {
    return prisma.user.update({
      where: { id: userId },
      data: { status }
    });
  },

  async getAllOrders() {
  return prisma.order.findMany({
    include: {
      customer: {
        select: { name: true, email: true }
      },
      provider: {
        select: { restaurant: true }
      },
      items: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
},

async getDashboardStats() {
  const totalUsers = await prisma.user.count();
  const totalProviders = await prisma.user.count({
    where: { role: "PROVIDER" }
  });
  const totalOrders = await prisma.order.count();

  const revenue = await prisma.order.aggregate({
    _sum: {
      totalAmount: true
    }
  });

  return {
    totalUsers,
    totalProviders,
    totalOrders,
    totalRevenue: revenue._sum.totalAmount || 0
  };
}
};

