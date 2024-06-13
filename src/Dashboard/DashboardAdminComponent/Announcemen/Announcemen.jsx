import Swal from "sweetalert2";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import moment from "moment";

function Announcemen() {
  const axiosCommon = useAxiosCommon();
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
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosCommon.post("/announcemen", {
          title,
          description,
          dataTime
        });
        console.log(data);
        if (data?.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Your file has been submit.",
            icon: "success",
          });
          e.target.reset();
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

  return (
    <div>
      <form onSubmit={handelAnnouncemen} className=" p-20">
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
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default Announcemen;
