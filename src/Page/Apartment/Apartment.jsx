import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { FaHouseFloodWater } from "react-icons/fa6";
import { MdApartment } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { VscRepoFetch } from "react-icons/vsc";
import toast from "react-hot-toast";
import moment from "moment";
function Apartment() {
  const axiosCommon = useAxiosCommon();
  const { user } = useAuth();
  const dateTime = moment().format("L");

  const { data: allaprtment = [], isLoading } = useQuery({
    queryKey: ["apartment"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/apartment`);
      return data;
    },
  });
  // console.log(allaprtment);

  // A. User name(who want to make an agreement/logged in user)
  // B. User email(who want to make an agreement/logged in user)
  // C. Floor no
  // D. Block name
  // E. Apartment no
  // F. Rent
  // G. Status(pending by default)

  const { mutateAsync } = useMutation({
    mutationFn: async (agrementData) => {
      const { data } = await axiosCommon.post(`/agreement`, agrementData);
      return data;
    },
    onSuccess: (data) => {
      if(data?.message){
      return toast.error("Already exist room.");
      }
      toast.success("Successfully Sign Agrement.");
    }
  });

  async function handelDataAgrement(data) {
    // console.log(data)
    const agrementData = {
      userName: user?.displayName,
      userEmail: user?.email,
      floorNo: data?.floor_no,
      block_name: data?.block_name,
      apartment_no: data?.apartment_no,
      rent: data?.rent,
      date: dateTime,
      status: "Pending",
    };
    try {
      await mutateAsync(agrementData);
    } catch (err) {
      console.log(err?.message);
    }
  }

  return (
    <div className="bg-[#F0F1F5]">
      <div className="grid grid-cols-4 container mx-auto gap-5 py-10">
        {allaprtment?.map((appartment, index) => {
          return (
            <div
              key={index}
              className="max-w-sm bg-[#FFFFFF] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="relative">
                <a href="#">
                  <img
                    className="rounded-t-lg h-[200px] object-cover"
                    src={appartment?.apartment_image}
                    alt=""
                  />
                </a>
                <div className="absolute bottom-0 right-0 bg-[#DC5658] text-white px-5 py-2">
                  <p>$ {appartment?.rent}</p>
                </div>
              </div>
              <div className="px-3 pt-2 flex flex-col gap-y-1">
                <p className="flex  gap-x-3 items-center">
                  <FaHouseFloodWater /> Floor no : {appartment?.floor_no}
                </p>
                <p className="flex  gap-x-3 items-center">
                  <SiGoogleclassroom />
                  Block name :{appartment?.block_name}
                </p>
                <p className="flex  gap-x-3 items-center">
                  <MdApartment /> Appartment No : {appartment?.apartment_no}
                </p>
              </div>
              <div className="p-3">
                <button
                  onClick={() => handelDataAgrement(appartment)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#DC5658] rounded-lg hover:bg-[#DC5658]
bg-[#DC5658]focus:ring-4 focus:outline-none focus:bg-[#DC5658]
bg-[#DC5658] dark:bg-[#DC5658]
bg-[#DC5658] dark:hover:bg-[#DC5658] dark:focus:bg-[#DC5658]
bg-[#DC5658]"
                >
                  {appartment?.agreement_button}
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Apartment;
