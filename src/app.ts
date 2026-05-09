// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { toNodeHandler } from "better-auth/node";
// import { auth } from "./lib/auth";
// import { errorMiddleware } from "./middlewares/error.middleware";
// import authRouter from "./modules/auth/auth.router";
// import providerRouter from "./modules/provider/provider.router";
// import categoryRouter from "./modules/category/category.router";
// import mealRouter from "./modules/meal/meal.router";
// import orderRouter from "./modules/order/order.router";
// import adminRouter from "./modules/admin/admin.router";


// dotenv.config();

// const app = express();

// app.use(cors({
//   origin: [
//     "http://localhost:3000"
//   ],
//   credentials: true
// }));
// app.use(express.json());

// app.use("/api/auth", toNodeHandler(auth));

// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/providers", providerRouter);
// app.use("/api/v1/categories", categoryRouter);
// app.use("/api/v1/meals", mealRouter);
// app.use("/api/v1/orders", orderRouter);
// app.use("/api/v1/admin", adminRouter);

// app.get("/", (_, res) => {
//   res.send("FoodHub API running...");
// });

// app.use(errorMiddleware);

// export default app;
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { errorMiddleware } from "./middlewares/error.middleware";
import { getAuth } from "./lib/auth";

import authRouter from "./modules/auth/auth.router";
import providerRouter from "./modules/provider/provider.router";
import categoryRouter from "./modules/category/category.router";
import mealRouter from "./modules/meal/meal.router";
import orderRouter from "./modules/order/order.router";
import adminRouter from "./modules/admin/admin.router";
import reviewRoutes from "./modules/review/review.routes";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}));

app.use(express.json());

(async () => {
  const { toNodeHandler } = await import("better-auth/node");
  const auth = await getAuth();

  app.use("/api/auth", toNodeHandler(auth));
})();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/providers", providerRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/meals", mealRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/reviews", reviewRoutes);

app.get("/", (_, res) => {
  res.send("FoodHub API running...");
});

app.use(errorMiddleware);

export default app;