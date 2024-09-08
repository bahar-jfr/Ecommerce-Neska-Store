import Brands from "@/components/home/Brands";
import Categories from "@/components/home/Categories";
import DiscountProduct from "@/components/home/swipers/DiscountProduct";
import ProductsBanner from "@/components/home/swipers/ProductsBanner";
import { MainLayout } from "@/components/layouts/main/Layout";
import { ReactElement } from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col gap-24  py-12 pb-32 px-24">
      <ProductsBanner />
      <DiscountProduct/>
      <Categories/>
      <Brands/>
    </div>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};