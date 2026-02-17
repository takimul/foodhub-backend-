import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),

  emailAndPassword: {
    enabled: true
  },

  secret: process.env.BETTER_AUTH_SECRET!,

  basePath: "/api/auth",

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "customer"
      }
    }
  }
});
