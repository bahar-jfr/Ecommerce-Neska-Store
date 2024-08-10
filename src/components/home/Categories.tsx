import { useGetCategories } from "@/api/category/category.queries";
import { pageLevelLocalization } from "@/constants/localization";
import { ICategory } from "@/types";
import Aos, * as AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";

const categoriesIcon = {
  qhwh: "/icons/coffee-icon.jpg",
  drink: "/icons/drink-icon.jpg",
  ghlat: "/icons/cereal-icon.jpg",
  mag: "/icons/mug-icon.jpeg",
};
type CategorySlug = keyof typeof categoriesIcon;

export default function Categories() {
  const { data } = useGetCategories();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    Aos.init();
    AOS.refresh();
  }, []);

  const setSearchParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  };

  return (
    <div className="flex flex-col gap-8 text-primary-foreground">
      <p className="text-3xl  font-semibold">
        {pageLevelLocalization.home.categories}
      </p>
      <div className="flex items-center justify-center gap-24">
        {data?.map((category: ICategory) => {
          return (
            <div
              key={category._id}
              className="flex flex-col items-center gap-4 cursor-pointer"
              onClick={() =>
                router.push(
                  `products?${setSearchParams("category", `${category._id}`)}`
                )
              }
            >
              <Image
                className="rounded-full object-cover h-44 w-44 p-2 shadow-[1px_3px_10px_1px_rgb(0,0,0,0.2)]"
                data-aos="flip-up"
                data-aos-offset="200"
                data-aos-duration="200"
                src={`${categoriesIcon[category.slugname as CategorySlug]}`}
                height={200}
                width={1000}
                alt={category.name}
              />
              <p className="text-xl ">{category.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
