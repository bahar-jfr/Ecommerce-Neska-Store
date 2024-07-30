import { useGetProducts } from "@/api/products/products.queries";
import { MainLayout } from "@/components/layouts/main/Layout";
import CardPreview from "@/components/products/card/CardPreview";
import Error from "@/components/shared/Error";
import Loading from "@/components/shared/Loading";
import { IProduct } from "@/types";
import { ReactElement } from "react";

export default function ProductsPage() {
  const { data, error, isLoading } = useGetProducts();
  console.log(isLoading);
  if (error) {
    return <Error message={error.message} />;
  }
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-3 gap-12 justify-items-center px-36 py-12 ">
      {data?.data.products.map((product: IProduct) => (
        <CardPreview key={product._id} data={product} />
      ))}
    </div>
  );
}


ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};