import Swal from "sweetalert2";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import moment from "moment";
import { useMutation, useQuery } from "@tanstack/react-query";
import Spinner from "../../../Component/Spinner";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import useAxiosSequre from "../../../Hook/useAxiosSequre";
import toast from "react-hot-toast";

function Announcemen() {
  const axiosSequre = useAxiosSequre()
  const axiosCommon = useAxiosCommon();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/announcement")
      return data;
    }
  })

  function handelAnnouncemen(e) {
    e.preventDefault();
    const dataTime = moment().format('MMMM Do YYYY, h:mm:ss a')
    const title = e.target.title.value;
    const description = e.target.description.value;

    // console.log(title, description);

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSequre.post("/announcemen", {
          title,
          description,
          dataTime
        });
        if (data?.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Your file has been submit.",
            icon: "success",
          });
          e.target.reset();
          refetch()
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      }
    });
  }


  if (isLoading) return <Spinner></Spinner>




  const handleDeleteAnnouncement = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSequre.delete(`/announcement/${id}`);
        if (data?.deletedCount) {
          toast.success("Delete successful")
          refetch()
        }
      }
    });
  };



  return (
    <div className="w-[90%] lg:w-[70%] mx-auto">
      <form onSubmit={handelAnnouncemen} className=" md:p-20 py-10">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Announcemen title
          </label>
          <input
            type="text"
            name="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="announcemen title"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Announcemen description
          </label>
          <textarea
            name="description"
            placeholder="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>


      <div className="space-y-5 m-4"> {
        data?.map((Annouc, index) => {
          return <div key={index} className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">


            <div className="flex justify-end ">
              <MdDelete className="text-red-500 rounded-full " onClick={() => handleDeleteAnnouncement(Annouc?._id)} size={27} />
            </div>
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{Annouc?.title}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{Annouc?.description}</p>
            <div className="md:flex justify-between">
              <Link to={`/dashboard/announcements/announcementsdetails/${Annouc?._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </Link>

              <h3>{Annouc?.dataTime}</h3>
            </div>



          </div>
        })
      }

      </div>
    </div>
  );
}
export default Announcemen;
