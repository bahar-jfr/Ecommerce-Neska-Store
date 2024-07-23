import { useGetProductById } from "@/api/products/products.queries";
import BuyCard from "@/components/products/single-product/BuyCard";
import ProductInfo from "@/components/products/single-product/ProductInfo";
import Error from "@/components/shared/Error";
import Loading from "@/components/shared/Loading";
import { useRouter } from "next/router";

export default function SingleProductPage() {
  const router = useRouter();
  const { data, error ,isLoading} = useGetProductById(router.query.id as string);
  if (error) {
    return <Error message={error.message} />;
  }
  if(isLoading) {
    return <Loading/>
  }
  return (
    <div className="flex justify-center px-24 h-screen">
      <ProductInfo data={data?.data.product} />
      <BuyCard data={data?.data.product}/>
    </div>
  );
}
