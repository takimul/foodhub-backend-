// import { betterAuth } from "better-auth";
// import { prismaAdapter } from "@better-auth/prisma-adapter";
// import { prisma } from "./prisma";

// export const auth = betterAuth({
//   database: prismaAdapter(prisma, {
//     provider: "postgresql"
//   }),

//   emailAndPassword: {
//     enabled: true
//   },

//   secret: process.env.BETTER_AUTH_SECRET!,

//   basePath: "/api/auth",

//   user: {
//     additionalFields: {
//       role: {
//         type: "string",
//         required: true,
//         defaultValue: "CUSTOMER"
//       }
//     }
//   },
//   trustedOrigins: [
//     "http://localhost:3000",
//     "http://localhost:5000",
//     "http://127.0.0.1:3000"
//   ]
// });
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

    user: {
      additionalFields: {
        role: {
          type: "string",
          required: true,
          defaultValue: "CUSTOMER"
        }
      }
    },

    trustedOrigins: [
      "http://localhost:3000",
      process.env.FRONTEND_URL || ""
    ]
  });

  return authInstance;
};