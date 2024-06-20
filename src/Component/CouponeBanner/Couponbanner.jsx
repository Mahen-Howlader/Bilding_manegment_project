
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosCommon from '../../Hooks/useAxiosCommon';
import Spinner from '../Spinner';
import toast from 'react-hot-toast';
function Couponbanner() {
  // mahin
  const axiosCommon = useAxiosCommon()
  // mahin Howlader ?
  const copyToClipboard = () => {
    const couponCode = document.getElementById("cpnCode").innerText;
    navigator.clipboard.writeText(couponCode);
    toast.success("Coupon code copied to clipboard!");
  };



  const { data ,isLoading} = useQuery({
    queryKey: ["couponcode"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/couponcard");
      return data;
    }
  })

  if(isLoading) return <Spinner></Spinner>
  console.log(data)


  return (
    <div>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {
          data?.map((cou, index) => {
            return <SwiperSlide key={index}>

              <div className="">
                <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-center py-10 md:px-20 rounded-lg shadow-md ">
                  <h3 className="text-2xl font-semibold mb-4">
                    {cou?.discountPercentage}% {cou?.couponDescription}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 mb-6">
                    <span
                      id="cpnCode"
                      className="border-dashed border text-white px-4 py-2 rounded-l"
                    >
                      {cou?.coupon}
                    </span>
                    <span
                      id="cpnBtn"
                      className="border border-white bg-white text-purple-600 px-4 py-2 rounded-r cursor-pointer"
                      onClick={copyToClipboard}
                    >
                      Copy Code
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          })
        }
      </Swiper>


    </div>
  );
}

export default Couponbanner;
