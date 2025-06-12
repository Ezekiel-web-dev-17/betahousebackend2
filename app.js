// tabukeezekiel9
// 8nA2Siyxl5mqZ6tG

import cookieParser from "cookie-parser";
import express from "express";
import authRoute from "./routes/auth.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import { PORT } from "./config/env.js";
import { connectDb } from "./database/mongodb.js";
import authorize from "./middlewares/auth.middleware.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use(authorize);
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World!!!!!");
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectDb();
});

export default app;
