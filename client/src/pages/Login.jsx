import { useState } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { login, getMe } from "../service/user";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/user/userSlice";

import { Loading } from "../ui";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const from = location.state?.from?.pathname || "/posts";

  const { isAuthenticated, authChecked } = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login({ email, password });
      const userData = await getMe();

      console.log("ResPonse: " + userData);

      if (userData?.user) dispatch(setUser(userData.user));

      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  if (!authChecked)
    return <Loading className="p-6 text-white">Loading...</Loading>;

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#020617] to-black px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-10 shadow-xl backdrop-blur-xl">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          Login
        </h2>

        {error && (
          <p className="mb-4 text-center font-medium text-red-500">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-green-500 py-3 font-semibold text-black transition hover:bg-green-400"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <span
            className="cursor-pointer text-green-400 hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
