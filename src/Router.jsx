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
import Agrementrequest from "./Dashboard/DashboardAdminComponent/Agrementrequest/Agrementrequest";
import Managecoupons from "./Dashboard/DashboardAdminComponent/Managecoupons/Managecoupons";
import MemberAnnouncements from "./Dashboard/DashboardMember/MemberAnnouncements/MemberAnnouncements";
import Makepayment from "./Dashboard/DashboardMember/Makepayment/Makepayment";
import Paymentfare from "./Dashboard/DashboardMember/Makepayment/Paymentfare";
import Paymenthistory from "./Dashboard/DashboardMember/Paymenthistory/Paymenthistory";
import Announcementdetails from "./Dashboard/DashboardUser/AnnouncementDetails/Announcementdetails";
import Adminprofile from "./Dashboard/DashboardAdminComponent/Adminprofile/Adminprofile";
import Loginprivedroute from "./Dashboard/Privateroute/Loginprivedroute";
import Adminroute from "./Dashboard/Privateroute/Adminroute";

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
        element: <Loginprivedroute><Apartment></Apartment></Loginprivedroute> ,
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
    element: <Loginprivedroute><DashboardLayout></DashboardLayout></Loginprivedroute>,
    children: [
      {
        index: true,
        element: <Loginprivedroute><Profile></Profile></Loginprivedroute>
      },
      {
        path: "profile",
        element: <Loginprivedroute><Profile></Profile></Loginprivedroute>
      },
      {
        path: "managemember",
        element: <Adminroute><Managemember></Managemember></Adminroute> 
      },
      {
        path: "makeannouncemen",
        element: <Adminroute><Announcemen></Announcemen></Adminroute> 
      },
      {
        path: "agreementrequests",
        element: <Adminroute><Agrementrequest></Agrementrequest></Adminroute> 
      },
      {
        path: "managecoupons",
        element: <Adminroute><Managecoupons></Managecoupons></Adminroute> 
      },
      {
        path: "announcements",
        element: <Loginprivedroute><MemberAnnouncements></MemberAnnouncements></Loginprivedroute> 
      },
      {
        path: "payment",
        element: <Loginprivedroute><Makepayment></Makepayment></Loginprivedroute> 
      },
      {
        path: "paymentsFare",
        element: <Loginprivedroute><Paymentfare></Paymentfare></Loginprivedroute> 
      },
      {
        path: "paymenthistory",
        element: <Loginprivedroute><Paymenthistory></Paymenthistory></Loginprivedroute> 
      },
      {
        path: "announcements/announcementsdetails/:id",
        element: <Loginprivedroute><Announcementdetails></Announcementdetails></Loginprivedroute> 
      },
      {
        path: "Adminprofile",
        element: <Adminroute><Adminprofile></Adminprofile></Adminroute> 
      }
    ]
  }
]);

export default router;
