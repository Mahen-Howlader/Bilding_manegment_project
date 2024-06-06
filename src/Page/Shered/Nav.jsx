import { IoMdLogIn } from "react-icons/io";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <div className="fixed z-50 w-full bg-[#15527023]">
      <div className="container text-white mx-auto">
        <div className="navbar">
          <div className="navbar-start  flex  items-center">
            <img
              className="w-14 h-14"
              src="https://i.ibb.co/PhfZtKv/logo-hotel-removebg-preview.png"
              alt="logo"
            />
            <a className=" ml-2 font-bold text-2xl uppercase">Hotel Emma</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 uppercase">
              <li>
                <a className="">HOME</a>
              </li>
              <li>
                <a className="">Apartment</a>
              </li>
            </ul>
          </div>

          <div className="navbar-end ">
            <Link to="/login" className="flex gap-x-2 border  p-1 rounded-full">
              <IoMdLogIn size={27} />
              <h3>Login</h3>
            </Link>
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
                    src="https://i.ibb.co/PD3gm1s/placeholder.jpg"
                    alt="profile"
                    height="30"
                    width="30"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="">
                    HOME
                    <span className="badge">New</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
