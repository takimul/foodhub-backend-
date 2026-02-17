import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 5000;

async function start() {
  await prisma.$connect();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
  });
}

start();
