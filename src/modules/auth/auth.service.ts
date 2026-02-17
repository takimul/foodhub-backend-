import { prisma } from "../../lib/prisma";
import type { User, UserRole } from "../../../generated/prisma/client";

export const AuthService = {

  async setUserRole(
    userId: string,
    role: UserRole
  ): Promise<User> {
    return prisma.user.update({
      where: { id: userId },
      data: { role }
    });
  },

  async getMe(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        providerProfile: true
      }
    });
  }
};
