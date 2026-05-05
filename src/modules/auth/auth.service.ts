import { prisma } from "../../lib/prisma";
import type {
  UserRole
} from "../../generated/prisma/client.js";

export const AuthService = {
  async getMe(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        image: true,
        createdAt: true,
        providerProfile: true
      }
    });
  },

  async setUserRole(userId: string, role: UserRole) {
    return prisma.user.update({
      where: { id: userId },
      data: { role }
    });
  },

  async updateProfile(
    userId: string,
    payload: {
      name?: string;
      phone?: string;
      image?: string;
    }
  ) {
    return prisma.user.update({
      where: { id: userId },
      data: payload,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        image: true
      }
    });
  }
};