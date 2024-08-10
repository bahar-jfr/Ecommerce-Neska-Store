import { useGetOrders } from "@/api/orders/orders.queries";
import CardPreview from "@/components/cart/card/CardPreview";
import TotalOrderCard from "@/components/cart/TotalOrderCard";
import { MainLayout } from "@/components/layouts/main/Layout";
import { useCartStore } from "@/store";
import { ReactElement } from "react";



export default function CartPage() {
  const { products } = useCartStore();
  
  return (
    <div className="min-h-screen py-12 pb-32 px-24 flex items-start gap-12">
      <div className="grid grid-cols-2 gap-5 w-3/4">
        {products.map((product) => {
          return <CardPreview data={product} key={product.productId} />;
        })}
      </div>
      <div className="w-1/4">
       <TotalOrderCard/>
      </div>
    </div>
  );
}

CartPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
