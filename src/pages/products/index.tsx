import { getProducts } from "@/api/products/products.api";
import { useGetProducts } from "@/api/products/products.queries";
import { MainLayout } from "@/components/layouts/main/Layout";
import CardPreview from "@/components/products/card/CardPreview";
import FilterBox from "@/components/products/Filter";
import Error from "@/components/shared/Error";
import Loading from "@/components/shared/Loading";
import { IParams, IProduct } from "@/types";
import { dehydrate, hydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";

export default function ProductsPage({
  dehydratedState,
  params,
}: {
  dehydratedState: any;
  params: IParams;
}) {
  const queryClient = new QueryClient();
  hydrate(queryClient, dehydratedState);

  const { data, isLoading, error } = useGetProducts(params);

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

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const queryClient = new QueryClient();

  const params: IParams = Object.fromEntries(
    Object.entries({
      page: "",
      limit: 100,
      brand: query.brand,
      category: query.category,
      subcategory: query.subcategory,
      sort: query.sort,
    }).filter(([key, value]) => value !== undefined)
  );

  await queryClient.prefetchQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      params,
    },
  };
};

ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
