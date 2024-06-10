import { useQuery } from "@tanstack/react-query";
import { FaDeleteLeft } from "react-icons/fa6";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import Spinner from "../../../Component/Spinner";

function Managemember() {
  const axiosCommon = useAxiosCommon();

  const { data: members = [], isLoading } = useQuery({
    queryKey: ["managemember"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/member");
      return data;
    },
  });

  //   console.log(members);

  if (isLoading) return <Spinner></Spinner>;

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User name
              </th>
              <th scope="col" className="px-6 py-3">
                User email
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {members?.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item?.name}
                  </td>
                  <td className="px-6 py-4">{item?.email}</td>
                  <td className="px-6 py-4">
                    <button className="rounded-2xl flex items-center gap-x-2 bg-red-600 px-4 py-2 font-bold leading-none text-white">
                      <FaDeleteLeft />  Member
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Managemember;
