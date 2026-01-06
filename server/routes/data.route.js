import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  addPost,
  editPost,
  deletePost,
  searchPost,
  getMyPosts,
  getPublicPosts,
} from "../controllers/api.controller.js";

const router = express.Router();

router.get("/public", getPublicPosts);
router
  .get("/", protectRoute, getMyPosts)
  .post("/", protectRoute, addPost)
  .put("/:id", protectRoute, editPost)
  .delete("/", protectRoute, deletePost);
router.get("/search", protectRoute, searchPost);

export default router;
