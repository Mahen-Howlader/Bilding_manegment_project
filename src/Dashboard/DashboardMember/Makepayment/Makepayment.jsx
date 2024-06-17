import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosCommon from '../../../Hooks/useAxiosCommon';
import Spinner from '../../../Component/Spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const MakePayment = () => {
    const { user } = useAuth();
    const axiosCommon = useAxiosCommon();
    const [coupon, setCoupon] = useState('');
    const [couponResult, setCouponResult] = useState(null);
    const [finalRent, setFinalRent] = useState(null);


    const { data: rentFare = {}, error, isLoading } = useQuery({
        enabled: !!user?.email,
        queryKey: ["apartmentEmail", user?.email],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`makePayment/${user?.email}`);
            return data;
        }
    });

    const handelCouponFun = () => {
        if (coupon) {
            const fetchCoupon = async () => {
                try {
                    const { data } = await axiosCommon.get(`coupon/${coupon}`);
                    if (data?.discountPercentage && finalRent) {
                        const discountAmount = (finalRent * data.discountPercentage) / 100;
                        console.log(finalRent, discountAmount)
                        setFinalRent(finalRent - discountAmount);
                    } else {
                        setFinalRent(data?.rent);
                    }

                    if (data?.message) {
                        toast.error(data?.message)
                    }


                    // if (data?.discountPercentage && finalRent === null) {
                    //     const discountAmount = (data.rent * data.discountPercentage) / 100;
                    //     setFinalRent(data.rent - discountAmount);
                    // } else {
                    //     setFinalRent(data?.rent);
                    // }
                } catch (error) {
                    console.error('Error fetching coupon:', error);
                    // setCouponResult(null);
                    // setFinalRent(data?.rent);
                }
            };
            fetchCoupon();
        }
    }

    useEffect(() => {
        if (rentFare?.rent && finalRent === null) {
            setFinalRent(rentFare?.rent);
        }
    }, [rentFare]);

    if (isLoading) return <Spinner />;

    function handleSubmitInfo(e) {
        e.preventDefault();
        const form = e.target;
        const month = form.month.value;
        console.log(month);
        // Additional form handling logic here
    }



    function PaymentModal() {

    }







    return (
        <div className="my-10 max-w-md lg:max-w-lg mx-auto p-6 border border-gray-300 rounded shadow-lg">
            <form onSubmit={handleSubmitInfo}>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                        value={rentFare?.userEmail}
                        disabled
                        readOnly
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700">Floor:</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                            value={rentFare?.floorNo}
                            disabled
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Block Name:</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                            value={rentFare?.block_name}
                            disabled
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Apartment No/Room No:</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                            value={rentFare?.apartment_no}
                            disabled
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Rent:</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                            value={finalRent ? `${finalRent}$` : `${rentFare?.rent}$`}
                            disabled
                            readOnly
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Month:</label>
                    <select name='month' required className="w-full px-3 py-2 border border-gray-300 rounded">
                        <option value="">Select Month</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Coupon Code:</label>
                    <div className="flex">
                        <input
                            type="text"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            className="w-full px-3 py-2 border rounded-l-lg"
                        />
                        <button
                            type="button"
                            disabled={!coupon}
                            onClick={() => handelCouponFun()}
                            className="px-4 py-2 border rounded-r-lg bg-blue-500 text-white font-bold"
                        >
                            Apply
                        </button>
                    </div>
                </div>
                <Link
                    to="/dashboard/paymentsFare"
                    className="w-full px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Pay
                </Link>
            </form>
           
        </div>
    );
};

export default MakePayment;
