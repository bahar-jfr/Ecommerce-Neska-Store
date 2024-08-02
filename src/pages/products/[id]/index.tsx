import { useGetProductById } from "@/api/products/products.queries";
import { MainLayout } from "@/components/layouts/main/Layout";
import BuyCard from "@/components/products/single-product/BuyCard";
import ImageCarousel from "@/components/products/single-product/ImageCarousel";
import ProductInfo from "@/components/products/single-product/ProductInfo";
import RelateProducts from "@/components/products/single-product/RelateProducts";
import Services from "@/components/products/single-product/Services";
import ViewersComments from "@/components/products/single-product/ViewersComments";
import ViewrsScore from "@/components/products/single-product/ViewrsScore";
import Error from "@/components/shared/Error";
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
  /*   if (isLoading) {
    return <Loading />;
  } */

  return (
    <div className="flex flex-col gap-28 text-primary-foreground py-12 ">
      {!!router.query.id && (
        <>
          <div className="flex justify-center gap-10 px-24">
            <ImageCarousel data={data?.data?.product} />
            <ProductInfo data={data?.data?.product} />
            <BuyCard data={data?.data?.product} />
          </div>
          <div className="w-full bg-accent  py-6 px-24">
            <Services />
          </div>
          <div>
            <RelateProducts
              catId={data?.data?.product?.category._id}
              subId={data?.data?.product?.subcategory._id}
              prdId={data?.data?.product?._id}
            />
          </div>
          <div className="flex gap-12 w-full px-24 ">
            <ViewersComments data={data?.data?.product} />
            <ViewrsScore data={data?.data?.product} />
          </div>
        </>
      )}
    </div>
  );
}

SingleProductPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
