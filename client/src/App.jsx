import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

import { Home, Login, ProfilePage, SignUp } from "./pages";
import { PostView, Public, MyPostsPage } from "./features/post";
import { NewPost } from "./controllers";
import { action } from "./controllers/NewPost";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./ui/ProtectedRoute";

import { getMe } from "./service/user";
import { setAuthChecked, setUser, logoutUser } from "./features/user/userSlice";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/public", element: <Public /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/post/:id", element: <PostView /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/profile", element: <ProfilePage /> },
          { path: "/add-post", element: <NewPost />, action: action },
          { path: "/posts", element: <MyPostsPage /> },
        ],
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUser() {
      try {
        const data = await getMe(controller.signal);

        if (data?.user) {
          dispatch(setUser(data.user));
        } else {
          dispatch(logoutUser());
        }
      } catch (e) {
        dispatch(logoutUser()); // ✅ important on network/401 errors
      } finally {
        dispatch(setAuthChecked()); // ✅ guarantee no infinite loading
      }
    }

    fetchUser();
    return () => controller.abort();
  }, [dispatch]);

  return <RouterProvider router={router} />;
}
export default App;
