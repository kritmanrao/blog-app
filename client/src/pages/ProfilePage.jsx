import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Redirect if user not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null; // optional while redirecting

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#020617] to-black p-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-10 text-center shadow-xl backdrop-blur-xl">
        <img
          src={user.avatar || "/default-avatar.png"}
          alt={user.fullName}
          className="mx-auto mb-4 h-24 w-24 rounded-full border border-white/20 object-cover"
        />
        <h2 className="mb-2 text-2xl font-semibold">{user.fullName}</h2>
        <p className="mb-2 text-gray-300">{user.email}</p>
      </div>
    </div>
  );
}
