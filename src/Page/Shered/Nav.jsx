import { IoMdLogIn } from "react-icons/io";
import { Link, NavLink, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { IoIosLogOut } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
function Nav() {
  const location = useLocation();
  const { user } = useAuth();
  const { logOut } = useAuth();

  function handelLogout() {
    logOut();
  }
  const setActive = ({ isActive }) =>
    isActive
      ? "inline-block pb-1 border-b-2 border-transparent rounded-t-lg border-white"
      : "";
  // console.log(location);

  return (
    <div
      className={`  ${
        location.pathname === "/" ? "fixed z-30 w-full bg-[#3017937c]" : "bg-[#2F1793]"
      }`}
    >
      <div className="container text-white mx-auto">
        <div className="navbar">
          <div className="navbar-start  flex gap-x-2 items-center">
            <img
              className="w-14 h-14"
              src="https://i.ibb.co/PhfZtKv/logo-hotel-removebg-preview.png"
              alt="logo"
            />
            <a className=" font-bold text-2xl uppercase mt-2 fondamento-regular">Hotel Emma</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="flex font-medium gap-x-5 px-1 uppercase">
              <li>
                <NavLink to={"/"} className={setActive}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"/apartment"} className={setActive}>
                  Apartment
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="navbar-end ">
            {user && user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
                  </svg>
                  <div className="hidden md:block">
                    <img
                      className="rounded-full"
                      referrerPolicy="no-referrer"
                      src={
                        user && user
                          ? user?.photoURL
                          : "https://i.ibb.co/PD3gm1s/placeholder.jpg"
                      }
                      alt="profile"
                      height="30"
                      width="30"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu gap-y-3 menu-sm dropdown-content text-black mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li className="text-center">{user && user?.displayName}</li>
                  <li>
                    <Link to="/dashboard" className="">
                      <MdDashboard size={23} />
                      DASHBOARD
                    </Link>
                  </li>
                  <li>
                    <div onClick={handelLogout} className="">
                      <IoIosLogOut size={23} />
                      LOGOUT
                    </div>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex gap-x-2 border  p-1 rounded-full"
              >
                <IoMdLogIn size={27} />
                <h3>Login</h3>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
