import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  addPost,
  editPost,
  deletePost,
  searchPost,
  getMyPosts,
  getPublicPosts,
  toggleLike,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/public", getPublicPosts);
router
  .get("/", protectRoute, getMyPosts)
  .post("/", protectRoute, addPost)
  .post("/:postId/like", protectRoute, toggleLike)
  .put("/:postId", protectRoute, editPost)
  .delete("/:postId", protectRoute, deletePost);

router.get("/search", searchPost);
export default router;
