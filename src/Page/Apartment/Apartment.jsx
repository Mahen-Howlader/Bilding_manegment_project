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
import Spinner from "../../Component/Spinner";
import { count } from "firebase/firestore";
import { useEffect, useState } from "react";
function Apartment() {
  const axiosCommon = useAxiosCommon();
  const { user } = useAuth();
  const dateTime = moment().format("L");
  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);


  // const { data: allaprtment = [], isLoading : apartmentLoading, refetch } = useQuery({
  //   queryKey: ["apartment"],
  //   queryFn: async () => {
  //     const { data } = await axiosCommon.get(`/apartment?page=${currentPage}&size=${itemPerPage}`);
  //     return data;
  //   },
  // });

  // Fetch paginated apartments
  const { data: paginationData = {}, isLoading: paginationLoading } = useQuery({
    queryKey: ["apartmentPagination"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/paginationapartment");
      return data;
    },
  });
  const [allaprtment, setAllaprtment] = useState([])
  const [allaprtmentLoading, setAllaprtmentLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setAllaprtmentLoading(true)
      try {
        const { data } = await axiosCommon.get(`/apartment?page=${currentPage}&size=${itemPerPage}`);
        setAllaprtment(data);
        setAllaprtmentLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state if needed
      }
    };

    fetchData();
  }, [itemPerPage, currentPage]);

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/user/${user?.email}`);
      return data;
    },
  });


  const { mutateAsync } = useMutation({
    enabled: !!user?.email,
    mutationFn: async (agrementData) => {
      const { data } = await axiosCommon.post(`/agreement`, agrementData);
      return data;
    },
    onSuccess: (data) => {
      if (data?.message) {
        return toast.error("Already exist room.");
      }
      toast.success("Successfully Sign Agrement.");
    },
  });

  async function handelDataAgrement(data) {
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






  if (allaprtmentLoading || paginationLoading) return <Spinner />;


  // const itemPerPage = 10;

  const count = paginationData?.count;
  const numberOfPage = Math.ceil(count / itemPerPage)
  const page = [...Array(numberOfPage).keys()]

  const handleChange = (event) => {
    const val = event.target.value;
    setItemPerPage(val);
    setCurrentPage(0)

  };
  // console.log(page)



  function handelPrveiousfun() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);

    }
  }

  function handelNextfun() {
    if (currentPage < page.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }
  function handelClickPage(page) {
    console.log(page)

    setCurrentPage(page);
  }

  return (
    <div className="bg-[#F0F1F5]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container mx-auto gap-5 py-10">
        {allaprtment?.map((appartment, index) => {
          return (
            <div
              key={index}
              className=" bg-[#FFFFFF] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="relative">
                <a href="#">
                  <img
                    className="rounded-t-lg w-full h-[200px] object-cover"
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
                  disabled={userInfo?.role === "admin"}
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
      <div>
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button onClick={handelPrveiousfun} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">

              <span className="font-bold text-black">Previous</span>
            </button>
            <button onClick={handelNextfun} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span className="font-bold text-black">Next</span>

            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing
                <span className="font-medium">1</span>
                to
                <span className="font-medium">10</span>
                of
                <span className="font-medium">97</span>
                results
              </p>
            </div>
            <div className="flex gap-x-3">
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button onClick={handelPrveiousfun} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                  </svg>
                </button>
                {
                  page.map((page, index) => {
                    return <button onClick={() => { handelClickPage(page) }} key={page} className={`${currentPage === page ? "selected bg-indigo-600 text-white" : undefined} border text-black relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>{page}</button>
                  })
                }



                <button onClick={handelNextfun} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
              <div>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={itemPerPage}
                  onChange={handleChange}
                >

                  <option value="5">5</option>
                  <option value="10">
                    10
                  </option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                </select>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Apartment;
