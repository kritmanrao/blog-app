import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  toggleLike,
  toggleFavorite,
  getFavoritePosts,
} from "../../service/post";
// adjust path if PostView is in different folder

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PostView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const postFromState = state?.post;

  const {
    user: currentUser,
    isAuthenticated,
    authChecked,
  } = useSelector((s) => s.user);

  // keep a local copy so we can update likes instantly
  const [post, setPost] = useState(postFromState);
  const [isFavorited, setIsFavorited] = useState(false);
  const [busy, setBusy] = useState(false);

  const currentUserId = currentUser?._id || currentUser?.id;

  const authorObj =
    typeof post.user === "object" && post.user !== null ? post.user : null;

  const authorName =
    authorObj?.fullName || (typeof post.user === "string" ? "You" : "Unknown");

  const authorAvatar = authorObj?.avatar || currentUser?.avatar || null;

  const likeCount = Array.isArray(post.likes) ? post.likes.length : 0;

  const likedByMe = useMemo(() => {
    if (!currentUserId) return false;
    return Array.isArray(post.likes) && post.likes.includes(currentUserId);
  }, [post.likes, currentUserId]);

  // fetch favorite status once we know auth
  useEffect(() => {
    if (!authChecked) return;
    if (!isAuthenticated) return;

    (async () => {
      const favDoc = await getFavoritePosts(); // backend returns { favorites: [...] } doc (or null)

      // Your backend returns: data: favoritesPosts (document)
      // favorites list is in favDoc?.favorites
      const favList = Array.isArray(favDoc?.favorites) ? favDoc.favorites : [];

      // post._id is string. favList entries might be strings or objects
      const favIds = new Set(
        favList
          .map((x) => (typeof x === "string" ? x : x?._id))
          .filter(Boolean),
      );

      setIsFavorited(favIds.has(post._id));
    })();
  }, [authChecked, isAuthenticated, post._id]);

  const requireLogin = () => {
    navigate("/login", { replace: true, state: { from: location } });
  };

  const handleToggleLike = async () => {
    if (!isAuthenticated) return requireLogin();
    if (!currentUserId) return;

    setBusy(true);
    try {
      const res = await toggleLike(post._id); // returns { success, liked }
      if (!res?.success) return;

      setPost((prev) => {
        const likes = Array.isArray(prev.likes) ? prev.likes : [];
        const alreadyLiked = likes.includes(currentUserId);

        const newLikes = alreadyLiked
          ? likes.filter((id) => id !== currentUserId)
          : [...likes, currentUserId];

        return { ...prev, likes: newLikes };
      });
    } finally {
      setBusy(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) return requireLogin();

    setBusy(true);
    try {
      const res = await toggleFavorite(post._id); // returns { success, data: [ids...] }
      if (!res?.success) return;

      const arr = Array.isArray(res.data) ? res.data : [];
      const favIds = new Set(
        arr.map((x) => (typeof x === "string" ? x : x?._id)).filter(Boolean),
      );

      setIsFavorited(favIds.has(post._id));
    } finally {
      setBusy(false);
    }
  };

  // If refresh happens, router state is lost
  if (!postFromState) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-white">
        <p className="mb-4">Post data not found (maybe you refreshed).</p>
        <button
          onClick={() => navigate(-1)}
          className="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20"
        >
          ← Go back
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 rounded-lg bg-white/10 px-4 py-2 text-white hover:bg-white/20"
      >
        ← Back
      </button>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">{post.title}</h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                {authorAvatar ? (
                  <img
                    src={authorAvatar}
                    alt={authorName}
                    className="h-7 w-7 rounded-full border border-white/10"
                  />
                ) : (
                  <div className="h-7 w-7 rounded-full bg-white/10" />
                )}
                <span className="font-medium text-gray-200">{authorName}</span>
              </div>

              <span className="opacity-60">•</span>
              <span>Created: {formatDate(post.createdAt)}</span>

              {post.updatedAt && post.updatedAt !== post.createdAt && (
                <>
                  <span className="opacity-60">•</span>
                  <span>Updated: {formatDate(post.updatedAt)}</span>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col items-end gap-2">
            <div className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-200">
              ❤️ {likeCount} {likeCount === 1 ? "Like" : "Likes"}
            </div>

            {typeof post.isPublished === "boolean" && (
              <div
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  post.isPublished
                    ? "bg-green-500/15 text-green-300"
                    : "bg-yellow-500/15 text-yellow-300"
                }`}
              >
                {post.isPublished ? "Published" : "Draft"}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={handleToggleLike}
            disabled={busy}
            className={`rounded-lg px-4 py-2 font-semibold transition ${
              likedByMe
                ? "bg-pink-500/20 text-pink-200 hover:bg-pink-500/25"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {likedByMe ? "Unlike" : "Like"}
          </button>

          <button
            onClick={handleToggleFavorite}
            disabled={busy}
            className={`rounded-lg px-4 py-2 font-semibold transition ${
              isFavorited
                ? "bg-yellow-500/20 text-yellow-200 hover:bg-yellow-500/25"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {isFavorited ? "Unfavorite" : "Favorite"}
          </button>

          {!isAuthenticated && (
            <span className="self-center text-sm text-gray-400">
              (Login required for like/favorite)
            </span>
          )}
        </div>

        {/* Content */}
        <p className="mt-6 leading-relaxed whitespace-pre-wrap text-gray-200">
          {post.content}
        </p>
      </div>
    </div>
  );
}
