import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import { Link } from "react-router-dom";
import Spinner from "../../../Component/Spinner";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useRole from "../../../Hooks/useRole";

function Agrementrequest() {
  const axiosCommon = useAxiosCommon();
  const [role, loading] = useRole();
  console.log(role);
  const { data: agreementAllData = [], isLoading } = useQuery({
    queryKey: ["agreement"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/agreement`);
      return data;
    },
  });

  console.log(agreementAllData);

  async function rejectableFun(room) {
    const role = { role: "user" };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data: datarole } = await axiosCommon.patch(
            `/changerole/${room?.userEmail}`,
            role
          );

          const { data: deleteData } = await axiosCommon.delete(
            `/agrementdelete/${room?.userEmail}`
          );

          // console.log(deleteData);

          // console.log(datarole);
          if (datarole?.matchedCount || deleteData?.deletedCount) {
            toast.success("Reject successful !");
          }
          
        } catch (error) {
          console.error("Error updating status:", error);
        }
      }
    });
  }

  function acceptableFun(room) {
    const status = { status: "Accept" };
    const role = { role: "member" };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data: statusData } = await axiosCommon.patch(
            `/agrementstatus/${room?.userEmail}`,
            status
          );
          const { data: datarole } = await axiosCommon.patch(
            `/changerole/${room?.userEmail}`,
            role
          );

          // const { data: deleteData } = await axiosCommon.delete(
          //   `/agrementdelete/${room?.userEmail}`
          // );

          // console.log(deleteData);
          console.log(datarole);

          if (statusData?.modifiedCount && datarole?.modifiedCount) {
            toast.success("Accepted romm !");
          }
        } catch (error) {
          console.error("Error updating status:", error);
        }
      }
    });
  }
  if (isLoading) return <Spinner></Spinner>;
  return (
    <div>
      <section className="container mx-auto p-6 font-mono">
        <p className=" rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8">
          <button className="btn">Accept</button>
        </p>

        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Name/Email</th>
                  <th className="px-4 py-3">Floor no</th>
                  <th className="px-4 py-3">Block name</th>
                  <th className="px-4 py-3">Room no</th>
                  <th className="px-4 py-3"> Rent</th>
                  <th className="px-4 py-3">Request Date</th>
                  <th className="px-4 py-3">Accept/Reject</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {agreementAllData.map((room, index) => {
                  return (
                    <tr key={index} className="text-gray-700">
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          <div>
                            <p className="font-semibold text-black">
                              {room?.userEmail}
                            </p>
                            <p className="text-xs text-gray-600">
                              {room?.userName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-ms font-semibold border">
                        {room?.floorNo}
                      </td>
                      <td className="px-4 py-3 text-ms font-semibold border">
                        {room?.block_name}
                      </td>
                      <td className="px-4 py-3 text-ms font-semibold border">
                        {room?.rent}
                      </td>
                      <td className="px-4 py-3 text-ms font-semibold border">
                        {room?.rent}
                      </td>

                      <td className="px-4 py-3 text-sm border">{room?.date}</td>
                      <td className="px-4 py-3 text-xs border flex flex-col gap-y-2">
                        <span
                          onClick={() => acceptableFun(room)}
                          className="px-2 text-center cursor-pointer py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"
                        >
                          {" "}
                          Accept{" "}
                        </span>
                        <span
                          onClick={() => rejectableFun(room)}
                          className="px-2 text-center py-1 cursor-pointer font-semibold leading-tight text-red-700 bg-red-100 rounded-sm"
                        >
                          {" "}
                          Reject{" "}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Agrementrequest;
