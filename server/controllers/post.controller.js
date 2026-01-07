import Post from "../models/Post.js";
import mongoose from "mongoose";

export async function getMyPosts(req, res) {
  const userId = req.user._id;
  const posts = await Post.find({ user: userId });
  res.status(200).json({ data: posts });
}

export async function getPublicPosts(req, res) {
  const posts = await Post.find({ isPublished: true }).populate(
    "user",
    "fullName avatar"
  );
  res.status(200).json({ data: posts });
}
export async function addPost(req, res) {
  try {
    const { title, content, isPublished } = req.body;
    const userId = req.user._id;

    if (!title || !content) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields: [!title && "title", !content && "content"].filter(
          Boolean
        ),
      });
    }

    const newPost = await Post.create({
      user: userId,
      title: title.trim(),
      content: content.trim(),
      isPublished: isPublished ?? true,
    });

    res.status(201).json({
      success: true,
      message: "Post added successfully",
      data: newPost,
    });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function editPost(req, res) {
  try {
    const userId = req.user._id;
    const { postId } = req.params;
    const { title, content, isPublished } = req.body;

    if ((!title && !content) || isPublished === undefined) {
      return res.status(400).json({
        message: "At least one field is required to update",
      });
    }

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId, user: userId }, // 🔐 ownership check
      {
        ...(title && { title: title.trim() }),
        ...(content && { content: content.trim() }),
        isPublished,
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        message: "Post not found or unauthorized",
      });
    }
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.error("Error editing post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function toggleLike(req, res) {
  try {
    const { postId } = req.params;
    const userId = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const liked = post.likes.includes(userId);

    await Post.findByIdAndUpdate(postId, {
      [liked ? "$pull" : "$addToSet"]: { likes: userId },
    });

    res.status(200).json({
      success: true,
      liked: !liked,
    });
  } catch (error) {
    console.error("Like toggle error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deletePost(req, res) {
  try {
    const userId = req.user._id;
    const { postId } = req.params;

    const deleteRes = await Post.deleteOne({
      _id: postId,
      user: userId, // 🔐 ownership check
    });

    if (deleteRes.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Post not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function searchPost(req, res) {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const posts = await Post.find({
      isPublished: true,
      $or: [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
      ],
    })
      .populate("user", "fullName avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error("Error searching posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
