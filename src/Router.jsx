import { createBrowserRouter } from "react-router-dom";
import Home from "./Page/Home/Home";
import Layout from "./Layout/Layout";
import Login from "./Page/Authentication/Login";
import Register from "./Page/Authentication/Register";
import Apartment from "./Page/Apartment/Apartment";
import Statistic from "./Component/Common/Statistic";
import DashboardLayout from "./Dashboard/DashboardLayout/DashboardLayout";
import Profile from "./Dashboard/DashboardComponent/Profile/Profile";

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
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children : [
      {
        index : true,
        element : <Statistic></Statistic>
      },
      {
        path : "profile",
        element : <Profile></Profile>
      }
    ]
  }
]);

export default router;
