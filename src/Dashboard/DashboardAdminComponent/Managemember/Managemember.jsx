import { useMutation, useQuery } from "@tanstack/react-query";
import { FaDeleteLeft } from "react-icons/fa6";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import Spinner from "../../../Component/Spinner";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

function Managemember() {
  const axiosCommon = useAxiosCommon();

  const { data: members = [], isLoading,refetch } = useQuery({
    queryKey: ["managemember"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/member");
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (member) => {
      const { data: roleChangeData } = await axiosCommon.patch(`/rolechange/${member?.email}`);
      const { data: agreementDeleteData } = await axiosCommon.delete(`/agrementdelete/${member?.email}`);
      return {roleChangeData,agreementDeleteData};
    },
    onSuccess: (data) => {
      console.log(data)
      toast.success("Remove member success.");
      refetch()
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  async function rejectableFun(member) {
    console.log(member);
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
          await mutateAsync(member);
        } catch (error) {
          console.error("Error updating status:", error?.message);
        }
      }
    });
  }

  if (isLoading) return <Spinner></Spinner>;

  return (
    <div>
      <div className="w-full mb-8 overflow-hidden p-2 rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">User name</th>
                <th className="px-4 py-3">User email</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {members.map((item, index) => {
                return (
                  <tr key={index} className="text-gray-700">
                    <td className="px-4 py-3 text-ms font-semibold border">
                      {item?.name}
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      {item?.email}
                    </td>

                    <td className="px-4 py-3 border ">
                      <span
                        onClick={() => rejectableFun(item)}
                        className="px-2  text-center py-1 cursor-pointer font-semibold leading-tight text-red-700 bg-red-100 rounded-sm"
                      >
                        {" "}
                        Remove{" "}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Managemember;
