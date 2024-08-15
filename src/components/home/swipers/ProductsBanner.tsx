import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import NescafeSlide from "@/components/home/banners/NescafeSlide";
import StarbucksSlide from "@/components/home/banners/StarbucksSlide";
import NesteleSlide from "../banners/NesteleSlide";

export default function ProductsBanner() {
  return (
    <Swiper
      autoplay={{ delay: 6000 }}
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="custom-swiper w-full "
    >
      <SwiperSlide>
        <NesteleSlide/>
      </SwiperSlide>
      <SwiperSlide>
        <NescafeSlide />
      </SwiperSlide>
      <SwiperSlide>
        <StarbucksSlide />
      </SwiperSlide>
    </Swiper>
  );
}
