import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import postRoute from "./routes/post.route.js";
import authRout from "./routes/auth.route.js";
import favoriteRoute from "./routes/favorite.routes.js";
import { connectDB } from "./lib/db.js";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
//  optional (for form data)
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());

app.use("/api/auth", authRout);
app.use("/api/posts", postRoute);
app.use("/api/posts/favorite", favoriteRoute);

app.listen(PORT, function () {
  console.log(`server live at http://localhost:${PORT}`);
  connectDB();
});
