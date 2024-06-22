import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import Spinner from "../../../Component/Spinner";
import { useEffect, useState } from "react";

function Paymenthistory(props) {
    const [search, setSearch] = useState("");
    const axiosCommon = useAxiosCommon()
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const [data, setData] = useState([]);


    useEffect(() => {
        setIsLoading(true);
        async function Paymenthistory() {
            try {
                const { data } = await axiosCommon.get(`paymentHistory/${user?.email}?search=${search}`);
                setData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error state if needed
                setIsLoading(false);
            }
        }
        Paymenthistory()
    }, [axiosCommon, user?.email, search]);


    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString(undefined, options);
    };


    function handelSearchFun(event) {
        event.preventDefault();
        const val = event.target.search.value;
        setSearch(val)
        console.log(val)
    }

    if (isLoading) return <Spinner></Spinner>;

    return (
        <div>
            <div className=' md:px-10 py-10 min-h-screen  from-purple-200 via-purple-300 to-purple-500 bg-gradient-to-br'>
                <form onSubmit={handelSearchFun} className="max-w-md mx-auto mb-3 px-4 md:px-0">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input name="search" type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>

                <div className="">
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">Person</th>
                                    <th scope="col" className="py-3 px-6">Bank Account</th>
                                    <th scope="col" className="py-3 px-6">Month</th>
                                    <th scope="col" className="py-3 px-6">Amount</th>
                                    <th scope="col" className="py-3 px-6">Pay Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map((payment, index) => {
                                        return <tr key={index} className="bg-white dark:bg-gray-800">
                                            <td className="py-4 px-6">{payment?.name}</td>
                                            <td className="py-4 px-6">{payment?.email}</td>
                                            <td className="py-4 px-6">{payment?.month}</td>
                                            <td className="py-4 px-6">{payment?.finalRent}$</td>
                                            <td className="py-4 px-6">
                                                {payment?.data ? `${formatDate(payment.data)}` : 'No Data'}
                                            </td>
                                        </tr>
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Paymenthistory;