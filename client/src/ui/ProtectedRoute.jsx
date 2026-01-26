import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const { isAuthenticated, authChecked } = useSelector((state) => state.user);
  const location = useLocation();

  // 1️⃣ Wait until auth check finishes
  if (!authChecked) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  // 2️⃣ Not logged in → go to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 3️⃣ Logged in → allow access
  return <Outlet />;
}
