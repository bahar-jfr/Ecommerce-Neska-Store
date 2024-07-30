import ProductsBanner from "@/components/home/swipers/ProductsBanner";
import { MainLayout } from "@/components/layouts/main/Layout";
import { ReactElement } from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full  flex flex-col gap-6  py-12 px-24">
      <ProductsBanner />
    </div>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};