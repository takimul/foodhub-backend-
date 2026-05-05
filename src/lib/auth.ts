import { prisma } from "./prisma";

let authInstance: any = null;

export const getAuth = async () => {
  if (authInstance) return authInstance;

  const { betterAuth } = await import("better-auth");
  const { prismaAdapter } = await import("@better-auth/prisma-adapter");

  authInstance = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),

  emailAndPassword: {
    enabled: true
  },

  secret: process.env.BETTER_AUTH_SECRET!,

  basePath: "/api/auth",

  trustedOrigins: [
    "http://localhost:3000",
    process.env.FRONTEND_URL || "" 
  ],

  // 🔥 FIX HERE
  cookies: {
    sessionToken: {
      attributes: {
        httpOnly: true,
        sameSite: "none", 
        secure: true      
      }
    }
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "CUSTOMER"
      }
    }
  }
});

  return authInstance;
};