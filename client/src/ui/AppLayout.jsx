import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import NavBar from "./NavBar";
import Footer from "./Footer";
import { fetchPublicPosts } from "../features/post/postSlice";

export default function AppLayout() {
  const dispatch = useDispatch();

  // Fetch public posts only once when the app loads
  useEffect(() => {
    dispatch(fetchPublicPosts());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white">
      <NavBar />

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
