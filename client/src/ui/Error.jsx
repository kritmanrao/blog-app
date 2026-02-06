import React from "react";

export default function Error() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 text-gray-100">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-7xl font-extrabold text-stone-500">404</h1>

        <h2 className="mb-2 text-2xl font-semibold">Page not found</h2>

        <p className="mb-6 text-gray-400">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <a
          href="/"
          className="inline-block rounded-lg bg-stone-500 px-6 py-3 font-medium text-white transition hover:bg-stone-600"
        >
          Go back home
        </a>
      </div>
    </div>
  );
}
