import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import axios from "axios";
import useAxiosSequre from "../../../Hook/useAxiosSequre";
function Managecoupons() {
  const [open, setOpen] = React.useState(false);
  const axiosSequre = useAxiosSequre();



  // get coupon array
  const { data: couponData = [], refetch } = useQuery({
    queryKey: ['couponData'],
    queryFn: async () => {
      const { data } = await axiosSequre.get('/coupon');
      return data;
    }
  });


  const { mutateAsync } = useMutation({
    mutationFn: async (coupon) => {
      const { data } = await axiosSequre.post(`/coupon`, coupon);
      return data;
    },
    onSuccess: (data) => {
      if (data?.insertedId) {
        setOpen(false);
        refetch()
        toast.success("Successfully Sign Agrement.");
      }
    },
  });



  const handleSubmit = async (e) => {
    e.preventDefault();
    const couponCode = e.target.elements.couponCode.value;
    const discountPercentage = e.target.elements.discountPercentage.value;
    const couponDescription = e.target.elements.couponDescription.value.toUpperCase();
    const coupon = couponCode.split(" ").join("").toUpperCase();

    if (coupon.length > 8) {
      return toast.error("Please coupon code input max 8 carecter.");
    }

    const infoCoupon = { discountPercentage, couponDescription, coupon };

    try {
      await mutateAsync(infoCoupon);
    } catch (err) {
      console.log(err.message);
    }

  };







  return (
    <div>
      <>
        <div className="flex justify-end m-10">
          <button
            className="rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={() => setOpen(true)}
          >
            New coupon add
          </button>
        </div>

        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Create a New Coupon
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="couponCode"
                  className="block  text-sm font-medium text-gray-700"
                >
                  Coupon Code
                </label>
                <input
                  type="text"
                  id="couponCode"
                  name="couponCode"
                  className="mt-1 uppercase block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Discount Percentage
                </label>
                <input
                  type="number"
                  id="discountPercentage"
                  name="discountPercentage"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="couponDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Coupon Description
                </label>
                <textarea
                  id="couponDescription"
                  name="couponDescription"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </>


      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Coupon code
              </th>
              <th scope="col" className="px-6 py-3">
                Discount percentage
              </th>
              <th scope="col" className="px-6 py-3">
                Coupon
                description
              </th>
            </tr>
          </thead>
          <tbody>
            {
              couponData.map((couponItem, index) => {
                return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {couponItem?.coupon}
                  </th>
                  <td className="px-6 py-4">
                    {couponItem?.discountPercentage} %
                  </td>
                  <td className="px-6 py-4 max-w-[300px]">
                    {couponItem?.couponDescription}
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>


    </div>
  );
}

export default Managecoupons;
