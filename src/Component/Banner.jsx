// https://i.ibb.co/Jj7KT07/emma-Banner1.jpg
// https://i.ibb.co/bQF55bg/emma-Hotel4.jpg
// https://i.ibb.co/b6JY9Zn/emma-Hotel2.jpg
// https://i.ibb.co/x3FJMqb/emma-Hotel3.jpg
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {Autoplay, Pagination, Navigation } from "swiper/modules";
function Banner() {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay,Pagination, Navigation]}
        className="mySwiper h-[90vh]"
      >
        <SwiperSlide><img className="w-full h-full object-cover" src="https://i.ibb.co/x3FJMqb/emma-Hotel3.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-full h-full object-cover" src="https://i.ibb.co/b6JY9Zn/emma-Hotel2.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-full h-full object-cover" src="https://i.ibb.co/bQF55bg/emma-Hotel4.jpg" alt="" /></SwiperSlide>

      </Swiper>
    </div>
  );
}

export default Banner;
