import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function PublicPosts() {
  const { publicPosts } = useSelector((state) => state.post);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black py-12 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-8 text-4xl font-bold text-green-400">Public Posts</h1>

        {/* POSTS GRID */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {publicPosts && publicPosts.length > 0 ? (
            publicPosts.map((post) => (
              <Link
                key={post._id}
                to={`/post/${post._id}`}
                state={{ post }}
                className="flex flex-col justify-between rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl transition-transform hover:scale-105"
              >
                <div>
                  <h2 className="mb-2 text-xl font-semibold text-white">
                    {post.title}
                  </h2>
                  <p className="mb-4 line-clamp-3 text-gray-300">
                    {post.content}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                  {/* LEFT — Author Full Name */}
                  <span className="text-sm font-medium text-yellow-50">
                    {post.user.fullName}
                  </span>

                  {/* RIGHT — Post Date */}
                  <span className="text-sm text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">
              No public posts available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
