import cookieParser from "cookie-parser";
import express from "express";
import authRoute from "./routes/auth.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import { PORT, STRIPE_SECRET_KEY, YOUR_DOMAIN } from "./config/env.js";
import { connectDb } from "./database/mongodb.js";
import authorize from "./middlewares/auth.middleware.js";
import cors from "cors";
import stripeRoute from "./routes/stripe.routes.js";

const app = express();
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/checkout", stripeRoute);
app.use(authorize);
app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectDb();
});

export default app;
