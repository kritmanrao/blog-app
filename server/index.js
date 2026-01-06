import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import dataRoutes from "./routes/data.route.js";
import authRout from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(helmet());
app.use(cookieParser());

app.use("/api/data", dataRoutes);
app.use("/api/auth", authRout);

app.listen(PORT, function () {
  console.log(`server live at http://localhost:${PORT}`);
  connectDB();
});
