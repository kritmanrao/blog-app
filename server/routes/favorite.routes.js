import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getFavoritePost,
  toggleFavorite,
} from "../controllers/favorite.controller.js";

const router = express.Router();

router
  .get("/", protectRoute, getFavoritePost)
  .post("/:postId", protectRoute, toggleFavorite);

export default router;
