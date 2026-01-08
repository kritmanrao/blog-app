import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

import { Home, Login, SignUp } from "./pages";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
