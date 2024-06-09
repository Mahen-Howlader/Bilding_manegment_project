import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import axios from "axios";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";

const Profile = () => {
  const { user } = useAuth();
  const [role, isLoading] = useRole();
  const { data: roomData = "", isLoading } = useQuery({
    queryKey: ["roomdata"],
    queryFn: async () => {
      const { data } = await useAxiosCommon.get(`/agreement/${user?.email}`);
      return data;
    },
  });
console.log(roomData)
  return (
    <>
      <div className="h-screen bg-gray-200 dark:bg-gray-800 flex flex-wrap items-center justify-center">
        <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 bg-white shadow-lg transform duration-200 ease-in-out">
          <div className="h-32 overflow-hidden">
            <img
              className="w-full"
              src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              alt="Background"
            />
          </div>
          <div className="flex justify-center  -mt-12">
            <img
              className="h-32 w-32 bg-white p-2 rounded-full"
              src={
                user
                  ? user?.photoURL
                  : "https://i.ibb.co/PD3gm1s/placeholder.jpg"
              }
              alt="Profile"
            />
          </div>
          <div className="text-center px-14">
            <h2 className="text-gray-800 text-2xl font-bold">
              {user?.displayName}
            </h2>
            <a
              className="text-gray-400 mt-2 hover:text-blue-500"
              href="https://www.instagram.com/immohitdhiman/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {user?.email}
            </a>
          </div>
          <hr className="mt-6" />
          <div className="flex bg-gray-50">
            <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
              <p>
                <span className="font-semibold">2.5k </span> Followers
              </p>
            </div>
            <div className="border"></div>
            <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
              <p>
                <span className="font-semibold">2.0k </span> Following
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* {
        role === "member" && 
    } */}
    </>
  );
};

export default Profile;
