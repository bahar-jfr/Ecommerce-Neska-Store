import { useGetProducts } from "@/api/products/products.queries";
import { pageLevelLocalization } from "@/constants/localization";
import { IProduct } from "@/types";
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
import CardPreview from "../card/CardPreview";

export default function RelateProducts({
  catId,
  subId,
  prdId,
}: {
  catId: string;
  subId: string;
  prdId: string;
}) {
  const { data } = useGetProducts({ category: catId, subcategory: subId });

  return (
    <div className="px-24 flex flex-col gap-6">
      <p className="text-xl font-semibold border-b-2 w-fit pb-2" >{pageLevelLocalization.products.singleProduct.relateProducts}</p>
      <Swiper
        autoplay={{ delay: 6000 }}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="custom-swiper w-full border-y-2"
      >
        {data?.data?.products
          ?.filter((product:IProduct) => product._id != prdId)
          .map((product: IProduct) => {
            return (
              <SwiperSlide>
                <div className="w-3/4 h-[400px] p-4">
                  <CardPreview key={product._id} data={product} />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}
