import { createBrowserRouter } from "react-router-dom";
import Home from "./Page/Home/Home";
import Layout from "./Layout/Layout";
import Login from "./Page/Authentication/Login";
import Register from "./Page/Authentication/Register";
import Apartment from "./Page/Apartment/Apartment";
import Statistic from "./Component/Common/Statistic";
import DashboardLayout from "./Dashboard/DashboardLayout/DashboardLayout";
import Profile from "./Dashboard/DashboardComponent/Profile/Profile";
import Managemember from "./Dashboard/DashboardAdminComponent/Managemember/Managemember";
import Announcemen from "./Dashboard/DashboardAdminComponent/Announcemen/Announcemen";

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
      },
      {
        path : "managemember",
        element : <Managemember></Managemember>
      },
      {
        path : "makeannouncemen",
        element : <Announcemen></Announcemen>
      }
    ]
  }
]);

export default router;
