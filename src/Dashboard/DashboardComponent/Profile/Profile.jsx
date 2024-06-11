import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import axios from "axios";
import Spinner from "../../../Component/Spinner";

const Profile = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();
  //   console.log(useAxiosCommon);
console.log(role)
  const { data: agrement, isLoading } = useQuery({
    queryKey: ["agrement"],
    enabled : !!user?.email,
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8000/agreement/${user?.email}`
      );
      // console.log(data?.role)
      return data;
    },
  });
  if (isLoading || isRoleLoading) return <Spinner></Spinner>;
  console.log(agrement);
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

          {role === "member" && (
            <div className="bg-gray-50">
              <div className="text-center  pt-3 hover:bg-gray-100 cursor-pointer">
                <h2 className="text-2xl underline underline-offset-8 pb-3 text-[#2F1793]">
                  Agreement accept
                </h2>
                <p>
                  <span className="font-semibold">
                    Accept date : {agrement?.date}
                  </span>
                </p>
              </div>
              <div className="text-center  p-4 hover:bg-gray-100 cursor-pointer">
                <p className="grid grid-cols-2 justify-items-start gap-3 ">
                  <span className="font-semibold">
                    Floor : {agrement?.floorNo}{" "}
                  </span>
                  <span className="font-semibold">
                    Block : {agrement?.block_name}{" "}
                  </span>
                  <span className="font-semibold">
                    Room no: {agrement?.apartment_no}{" "}
                  </span>
                  <span
                    className={`font-semibold ${
                      agrement?.status === `Pending`
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {" "}
                    Status : {agrement?.status}{" "}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
