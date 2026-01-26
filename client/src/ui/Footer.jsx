export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-br from-[#0f172a] via-[#020617] to-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-8 text-gray-400 md:flex-row">
        {/* LEFT — COPYRIGHT */}
        <p className="mb-4 text-sm md:mb-0">
          © {new Date().getFullYear()} Blog App. All rights reserved.
        </p>

        {/* RIGHT — LINKS */}
        <div className="flex space-x-6">
          <a
            href="https://github.com/kritmanrao/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-green-400"
          >
            GitHub
          </a>
          <a href="/privacy" className="transition hover:text-green-400">
            Privacy
          </a>
          <a href="/terms" className="transition hover:text-green-400">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
