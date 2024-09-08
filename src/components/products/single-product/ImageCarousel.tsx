import { IProduct } from "@/types";
import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ImageCarousel({ data }: { data: IProduct }) {
  const [activeIndex, setActiveIndex] = useState(0);


  return (
    <div className="w-1/3">
      <Swiper
        onActiveIndexChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="custom-swiper w-full "
        
      >
        {data?.images.map((image, index) => {
          {
          }
          return (
            <SwiperSlide key={index}>
              <Image
                src={`${image}`}
                alt={data.name}
                width={500}
                height={500}
                loading="lazy"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="flex items-center justify-center gap-3 pt-6">
        {data?.images.map((image, index) => {
          return (
            <div
              key={index}
              className={` ${
                activeIndex === index
                  ? "border-2 border-quaternary rounded-xl"
                  : ""
              }`}
            >
              <Image
                src={`${image}`}
                alt={data.name}
                width={100}
                height={100}
                loading="lazy"
                className="rounded-xl"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
