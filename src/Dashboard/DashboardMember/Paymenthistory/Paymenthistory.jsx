import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import Spinner from "../../../Component/Spinner";

function Paymenthistory(props) {
    const axiosCommon = useAxiosCommon()
    const { user } = useAuth()
    const { data = [], isLoading } = useQuery({
        enabled: !!user?.email,
        queryKey: ["userEamil", user?.email],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`paymentHistory/${user?.email}`);
            return data;
        }
    })

    console.log(data)

    if (isLoading) return <Spinner></Spinner>;


    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString(undefined, options);
    };


    return (
        <div>
            <div className=' px-10 py-10 min-h-screen  from-purple-200 via-purple-300 to-purple-500 bg-gradient-to-br'>
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