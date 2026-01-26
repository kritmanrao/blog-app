import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 md:grid-cols-2">
        {/* LEFT — HERO CONTENT */}
        <div>
          <h1 className="mb-6 text-5xl leading-tight font-bold">
            A modern platform
            <br />
            to share ideas ✍️
          </h1>

          <p className="mb-6 max-w-xl text-lg text-gray-300">
            Blog App is a fast, minimal, and developer-friendly blogging
            platform. Read public posts, write your own stories, and engage with
            meaningful content created by people around the world.
          </p>

          <p className="mb-8 max-w-xl text-gray-400">
            Built with performance, simplicity, and scalability in mind — just
            like modern web apps should be.
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
            <span className="rounded-full border border-gray-600 px-3 py-1">
              🚀 Fast
            </span>
            <span className="rounded-full border border-gray-600 px-3 py-1">
              🔐 Secure
            </span>
            <span className="rounded-full border border-gray-600 px-3 py-1">
              🎨 Clean UI
            </span>
            <span className="rounded-full border border-gray-600 px-3 py-1">
              ⚙️ Developer Friendly
            </span>
          </div>
        </div>

        {/* RIGHT — CTA CARD */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 p-10 shadow-xl backdrop-blur-xl">
            <h2 className="mb-4 text-2xl font-semibold">
              Explore Public Blogs
            </h2>

            <p className="mb-6 text-gray-300">
              Discover articles, tutorials, and stories shared by our community.
              No login required.
            </p>

            <Link
              to="/public"
              className="block rounded-lg bg-green-500 py-3 text-center font-semibold text-black transition hover:bg-green-400"
            >
              Go to Public Posts →
            </Link>

            <p className="mt-4 text-center text-xs text-gray-400">
              Read • Like • Learn • Share
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
