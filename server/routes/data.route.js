import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  addPost,
  editPost,
  deletePost,
  searchPost,
  getMyPosts,
  getPublicPosts,
  toggleFavorite,
  toggleLike,
} from "../controllers/api.controller.js";

const router = express.Router();

router.get("/public", getPublicPosts);
router
  .get("/", protectRoute, getMyPosts)
  .post("/", protectRoute, addPost)
  .post("/:postId/favorite", protectRoute, toggleFavorite)
  .post("/:postId/like", protectRoute, toggleLike)
  .patch("/:postId", protectRoute, editPost)
  .delete("/:postId", protectRoute, deletePost);
  
router.get("/search", protectRoute, searchPost);

export default router;
