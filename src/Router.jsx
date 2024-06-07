import { createBrowserRouter } from "react-router-dom";
import Home from "./Page/Home/Home";
import Layout from "./Layout/Layout";
import Login from "./Page/Authentication/Login";
import Register from "./Page/Authentication/Register";
import Apartment from "./Page/Apartment/Apartment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/apartment",
        element: <Apartment></Apartment>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Register></Register>,
  },
]);

export default router;
