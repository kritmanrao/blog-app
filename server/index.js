import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import authRout from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import favoriteRoute from "./routes/favorite.routes.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5001;

/* 🔥 CORS MUST BE FIRST */
app.use(
  cors({
    origin: "http://localhost:5173", // Vite React
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/* 🔥 Handle preflight */
app.options(/.*/, cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());

app.use("/api/auth", authRout);
app.use("/api/posts", postRoute); 
app.use("/api/posts/favorite", favoriteRoute);

app.listen(PORT, () => {
  console.log(`server live at http://localhost:${PORT}`);
  connectDB();
});
