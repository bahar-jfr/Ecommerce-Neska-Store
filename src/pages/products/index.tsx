import { useGetProducts } from "@/api/products/products.queries";
import CardPreview from "@/components/products/card/CardPreview";
import { IProduct } from "@/types";

export default function ProductsPage() {
  const { data: products } = useGetProducts();
  return (
    <div className="grid grid-cols-3 gap-12 justify-items-center px-36 ">
      {products?.map((product: IProduct) => {
        return <CardPreview key={product._id} data={product} />;
      })}
    </div>
  );
}
