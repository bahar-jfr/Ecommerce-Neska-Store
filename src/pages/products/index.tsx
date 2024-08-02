import { useGetProducts } from "@/api/products/products.queries";
import { MainLayout } from "@/components/layouts/main/Layout";
import CardPreview from "@/components/products/card/CardPreview";
import FilterBox from "@/components/products/Filter";
import Error from "@/components/shared/Error";
import Loading from "@/components/shared/Loading";
import { IProduct } from "@/types";
import { useSearchParams } from "next/navigation";
import { ReactElement } from "react";

export default function ProductsPage() {
  const params = useSearchParams();
  const brandParams = params.get("brand");
  const categoryParams = params.get("category");
  const subcategoryParams = params.get("subcategory");
  const sortParams = params.get("sort");


  const { data, isLoading, error } = useGetProducts({
    page: "",
    limit:100,
    brand: brandParams,
    category: categoryParams,
    subcategory : subcategoryParams,
    sort:sortParams
  });

  console.log(isLoading);
  if (error) {
    return <Error message={error.message} />;
  }
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex pt-12 pb-24 pr-12">
    <FilterBox />
    <div className="grid grid-cols-3 gap-12 justify-items-center px-24  h-fit">
      {data?.data?.products.map((product: IProduct) => (
        <CardPreview key={product._id} data={product} />
      ))}
    </div>
    </div>
  );
}

ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
