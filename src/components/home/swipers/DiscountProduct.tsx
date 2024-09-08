import { useGetProducts } from "@/api/products/products.queries";
import DiscountCard from "@/components/home/card/DiscountCard";
import { pageLevelLocalization } from "@/constants/localization";
import { IProduct } from "@/types";
import { MdDiscount } from "react-icons/md";
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

export default function DiscountProduct() {
  const { data: products } = useGetProducts({ discount: 1 });
  return (
    <div className=" px-12 pb-10 flex flex-col gap-8 ">
      <div className="flex items-center gap-3 text-attention font-bold text-4xl">
        <MdDiscount className="pt-2" />{" "}
        <p className="">{pageLevelLocalization.home.mostDiscount}</p>
      </div>
      <Swiper
        autoplay={{ delay: 6000 }}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="custom-swiper w-full bg-attention rounded-2xl  "
      >
        {products?.data?.products.map((product: IProduct) => {
          return (
            <SwiperSlide key={product._id} className="p-8">
              <DiscountCard key={product._id} data={product} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
