import { IProduct } from "@/types";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ImageCarousel({ data }: { data: IProduct }) {
  return (
    <div className="w-1/3">
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
        {data?.images.map((image, index) => {
          {
          }
          return (
            <SwiperSlide>
              <Image
                src={`http://localhost:8000/${image.replace(
                  "localhost:8000",
                  ""
                )}`}
                alt={data.name}
                width={500}
                height={500}
                loading="lazy"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
