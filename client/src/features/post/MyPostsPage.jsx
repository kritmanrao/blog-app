import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  getMyPosts,
  getFavoritePosts,
  toggleLike,
  deletePost,
  editPost,
  toggleFavorite,
} from "../../service/post";

import { fetchFavoritePosts } from "./postSlice.js";

export default function MyPostsPage() {
  const [posts, setPosts] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("latest");
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const { authChecked, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Fetch posts useNavigate
  useEffect(() => {
    let canceled = false;

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const favorites = await getFavoritePosts();
        const myPosts = await getMyPosts();

        // Not logged in / error → backend returned 401 → service returned null
        if (!myPosts || canceled) return;

        const favIds = new Set(favorites);
        setFavoriteIds(favIds);
        dispatch(fetchFavoritePosts(favIds));

        const sortedPosts = [
          // favorites first
          ...myPosts.filter((p) => favIds.has(p._id)),
          // then non-favorites
          ...myPosts.filter((p) => !favIds.has(p._id)),
        ];

        if (!canceled) {
          setPosts(sortedPosts);
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      canceled = true;
    };
  }, [dispatch]);
  // Handle like toggle
  const handleToggleLike = async (postId) => {
    const res = await toggleLike(postId);
  };

  // handle Favorite toggle

  async function handleToggleFavorite(postId) {
    const res = await toggleFavorite(postId);
    if (res?.success) {
      setFavoriteIds((prev) => {
        const updated = new Set(prev);
        if (prev.has(postId)) updated.delete(postId);
        else updated.add(postId);
        return updated;
      });

      // Reorder posts: favorites first
      setPosts((prevPosts) => [
        ...prevPosts.filter((p) => !favoriteIds.has(p._id) || p._id === postId),
        ...prevPosts.filter((p) => favoriteIds.has(p._id) && p._id !== postId),
      ]);
    }
  }

  // Handle delete
  const handleDelete = async (postId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this post?",
    );
    if (!confirm) return;

    const res = await deletePost(postId);
    if (res?.success) {
      setPosts((prev) => prev.filter((p) => p._id !== postId));
      setFavoriteIds((prev) => {
        const updated = new Set(prev);
        updated.delete(postId);
        return updated;
      });
    }
  };

  // Start edit
  const startEdit = (post) => {
    setEditId(post._id);
    setEditData({ title: post.title, content: post.content });
  };

  // Save edit
  const saveEdit = async (postId) => {
    const updated = await editPost(postId, editData);

    if (updated) {
      setPosts((prev) =>
        prev.map((p) => (p._id === postId ? { ...p, ...updated } : p)),
      );
      setEditId(null);
      setEditData({ title: "", content: "" });
    }
  };

  // Sorting
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === "latest")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest")
      return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  if (loading)
    return <p className="mt-20 text-center text-white">Loading posts...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-green-400">My Posts</h1>
          <button
            onClick={() => navigate("/add-post")} // route to your add post page
            className="rounded-lg bg-green-500 px-4 py-2 font-semibold text-black transition hover:bg-green-400"
          >
            + Add New Post
          </button>
        </div>

        {/* SORT */}
        <div className="mb-6 flex gap-4 text-white">
          <button
            className={`rounded-lg border px-3 py-1 ${
              sortBy === "latest" ? "bg-green-500" : "border-white/30"
            }`}
            onClick={() => setSortBy("latest")}
          >
            Latest
          </button>
          <button
            className={`rounded-lg border px-3 py-1 ${
              sortBy === "oldest" ? "bg-green-500" : "border-white/30"
            }`}
            onClick={() => setSortBy("oldest")}
          >
            Oldest
          </button>
          <button
            className={`rounded-lg border px-3 py-1 ${
              sortBy === "title" ? "bg-green-500" : "border-white/30"
            }`}
            onClick={() => setSortBy("title")}
          >
            Title
          </button>
        </div>

        {/* POSTS GRID */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.map((post) => (
            <div
              key={post._id}
              className="flex flex-col justify-between rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl transition-transform hover:scale-105"
            >
              <div>
                {editId === post._id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
                    />
                    <textarea
                      value={editData.content}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
                      rows={4}
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="mb-2 text-xl font-semibold text-white">
                      {post.title}
                    </h2>
                    <p className="mb-4 line-clamp-3 text-gray-300">
                      {post.content}
                    </p>
                  </>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <Link
                  to={`/post/${post._id}`}
                  className="text-pink-100"
                  state={{ post }}
                >
                  See More
                </Link>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  className={`flex-1 rounded-lg py-2 ${
                    favoriteIds.has(post._id)
                      ? "bg-green-500 text-black"
                      : "bg-white/20 text-white"
                  }`}
                  onClick={() => handleToggleFavorite(post._id)}
                >
                  {favoriteIds.has(post._id) ? "Unfavorite" : "Favorite"}
                </button>

                {editId === post._id ? (
                  <button
                    className="flex-1 rounded-lg bg-blue-500 py-2 text-black"
                    onClick={() => saveEdit(post._id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="flex-1 rounded-lg bg-yellow-500 py-2 text-black"
                    onClick={(e) => {
                      startEdit(post);
                    }}
                  >
                    Edit
                  </button>
                )}

                <button
                  className="flex-1 rounded-lg bg-red-500 py-2 text-black"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
