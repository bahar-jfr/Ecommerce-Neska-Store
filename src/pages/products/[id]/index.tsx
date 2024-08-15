import { MainLayout } from "@/components/layouts/main/Layout";
import BuyCard from "@/components/products/single-product/BuyCard";
import ImageCarousel from "@/components/products/single-product/ImageCarousel";
import ProductInfo from "@/components/products/single-product/ProductInfo";
import RelateProducts from "@/components/products/single-product/RelateProducts";
import Services from "@/components/products/single-product/Services";
import ViewersComments from "@/components/products/single-product/ViewersComments";
import ViewrsScore from "@/components/products/single-product/ViewrsScore";
import { ReactElement } from "react";

import { getProductById, getProducts } from "@/api/products/products.api";
import { IProduct } from "@/types";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetStaticPaths, GetStaticProps } from "next";

export default function SingleProductPage({
  product,
}: {
  product: { data: { product: IProduct }; status: string };
}) {
  const { data } = product;

  return (
    <div className="flex flex-col gap-28 text-primary-foreground py-12 ">
      {!!data && (
        <>
          <div className="flex justify-center gap-10 px-24">
            <ImageCarousel data={data.product} />
            <ProductInfo data={data.product} />
            <BuyCard data={data.product} />
          </div>
          <div className="w-full bg-accent  py-6 px-24">
            <Services />
          </div>
          <div>
            <RelateProducts
              catId={data.product.category._id}
              subId={data.product.subcategory._id}
              prdId={data.product._id}
            />
          </div>
          <div className="flex gap-12 w-full px-24 ">
            <ViewersComments data={data.product} />
            <ViewrsScore data={data.product} />
          </div>
        </>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  const productId = params?.id;
  await queryClient.prefetchQuery({
    queryKey: ["singleProduct", productId],
    queryFn: () => getProductById(`${productId}`),
  });

  const product = queryClient.getQueryData(["singleProduct", productId]);

  return {
    props: {
      product,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: () => getProducts({ page: "" }),
  });

  const products = queryClient.getQueryData(["products"]) as {
    data: {
      products: IProduct[];
    };
  };
  console.log(products);

  const paths = products.data.products.map((product: IProduct) => ({
    params: { id: product._id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

/* export const getStaticProps: GetStaticProps = async ({ params }) => {
 
  const productId = params?.id;
  
  const product = await getProductById(`${productId}`);

  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  
  const products = await getProducts();
  const paths = products?.data.products.map((product:IProduct) => ({
    params: { id: product._id },
  }));

  return {
    paths,
    fallback: false,
  };
}; */

SingleProductPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
