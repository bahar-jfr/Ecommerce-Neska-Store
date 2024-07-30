import { useGetProductById } from "@/api/products/products.queries";
import { MainLayout } from "@/components/layouts/main/Layout";
import BuyCard from "@/components/products/single-product/BuyCard";
import ImageCarousel from "@/components/products/single-product/ImageCarousel";
import ProductInfo from "@/components/products/single-product/ProductInfo";
import Services from "@/components/products/single-product/Services";
import ViewersComments from "@/components/products/single-product/ViewersComments";
import Error from "@/components/shared/Error";
import Loading from "@/components/shared/Loading";
import { useRouter } from "next/router";
import { ReactElement } from "react";

export default function SingleProductPage() {
  const router = useRouter();
  const { data, error, isLoading } = useGetProductById(
    router.query.id as string
  );
  if (error) {
    return <Error message={error.message} />;
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col gap-16 text-primary-foreground py-12 ">
      <div className="flex justify-center gap-10 px-24">
        <ImageCarousel data={data?.data?.product} />
        <ProductInfo data={data?.data?.product} />
        <BuyCard data={data?.data?.product} />
      </div>
      <div className="w-full bg-accent  py-6 px-24">
        <Services />
      </div>
      <ViewersComments />
    </div>
  );
}

SingleProductPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
