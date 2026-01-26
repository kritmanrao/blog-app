import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../service/user";

export default function NavBar() {
  const { isAuthenticated, authChecked } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // optional: prevent flicker
  if (!authChecked) return null;

  return (
    <nav className="border-b border-white/10 bg-transparent">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LEFT — LOGO */}
        <NavLink
          to="/"
          className="text-2xl font-bold text-white transition hover:text-green-400"
        >
          Blog
        </NavLink>

        {/* RIGHT — LINKS */}
        <ul className="flex items-center gap-6 text-gray-300">
          {/* PUBLIC (always visible) */}
          <li>
            <NavLink to="/public" className="hover:text-white">
              Public
            </NavLink>
          </li>

          {/* 🔐 AUTHENTICATED LINKS */}
          {isAuthenticated && (
            <>
              <li>
                <NavLink to="/posts" className="hover:text-white">
                  MyPosts
                </NavLink>
              </li>

              <li>
                <NavLink to="/add-post" className="hover:text-white">
                  Add Post
                </NavLink>
              </li>

              <li>
                <NavLink to="/profile" className="hover:text-white">
                  🙍‍♂️
                </NavLink>
              </li>

              <li>
                <NavLink
                  onClick={() => dispatch(logout())}
                  className="text-red-400 hover:text-red-500"
                >
                  Logout
                </NavLink>
              </li>
            </>
          )}

          {/* 🚪 NOT AUTHENTICATED */}
          {!isAuthenticated && (
            <>
              <li>
                <NavLink to="/login" className="hover:text-white">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" className="hover:text-white">
                  Signup
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
