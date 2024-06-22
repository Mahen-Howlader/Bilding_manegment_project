import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import MenuItem from "../Menu/MenuItem";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import ToggleBtn from "../../Component/Button/ToggleBtn";
import { BsGraphUp } from "react-icons/bs";
import Normalusersidebar from "../Menu/Normalusersidebar";
import Memberusersidebar from "../Menu/Memberusersidebar";
import AdminuserSidebar from "../Menu/AdminuserSidebar";
import { AiOutlineBars } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import useAdmin from "../../Hook/useAdmin";
import Spinner from "../../Component/Spinner";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [role, isLoading] = useRole();
  console.log(role, isLoading);
  const [isAdmin, adminLoading] = useAdmin()
  // console.log(isAdmin)

  const navigate = useNavigate()

  const handleToggle = () => {
    setActive(!isActive);
  };

  function handelLogout() {
    logOut()
    window.location.reload();
  }

  return (
    <>
      <div className="bg-gray-100 text-gray-800 flex justify-between  md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img
                // className='hidden md:block'
                src="https://i.ibb.co/PhfZtKv/logo-hotel-removebg-preview.png"
                alt="logo"
                width="80"
                height="80"
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-slate-200 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && "-translate-x-full"
          }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-2xl border-2 rounded-lg justify-center items-center mx-auto">
              <Link to="/">
                <img
                  // className='hidden md:block'
                  src="https://i.ibb.co/PhfZtKv/logo-hotel-removebg-preview.png"
                  alt="logo"
                  width="100"
                  height="100"
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}
            {/* {role === "member" && (
              <ToggleBtn toggleHandler={toggleHandler} toggle={toggle} />
            )} */}

            {/*  Menu Items */}
            <nav>
              {/* Statistics */}
              {
                role === "user" && <MenuItem
                  label="My Profile"
                  address="profile"
                  icon={CgProfile}
                />
              }
              {
                role === "member" && <MenuItem
                  label="My Profile"
                  address="profile"
                  icon={CgProfile}
                />
              }

              {role === "user" && <Normalusersidebar />}
              {role === "member" && <Memberusersidebar />}


              {isAdmin && role === "admin" && <AdminuserSidebar />}
            </nav>
          </div>
        </div>

        <div>
          <hr />
          <button
            onClick={handelLogout}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
