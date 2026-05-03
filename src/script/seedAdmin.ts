import { prisma } from "../lib/prisma";

async function main() {
  const admin = await prisma.user.findUnique({
    where: { email: "admin@foodhub.com" }
  });

  if (!admin) {
    console.log("Create admin first via signup.");
    return;
  }

  await prisma.user.update({
    where: { email: "admin@foodhub.com" },
    data: {
      role: "ADMIN",
      emailVerified: true
    }
  });

  console.log("Admin upgraded successfully");
}

main();