import { useGetProductById } from "@/api/products/products.queries";
import QuantityBtns from "@/components/cart/card/QuantityBox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { localization } from "@/constants/localization";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";

interface ProductData {
  productId: string;
  count: number;
  discount: number;
  price: number;
}

export default function CardPreview({
  data,
  key,
}: {
  data: ProductData;
  key: string;
}) {
  const { removeProduct } = useCartStore();
  const { data: productData } = useGetProductById(data.productId);

  const price = data.discount
    ? data.price - (data.price * data.discount) / 100
    : data.price;

  return (
    <Card className="flex gap-2 p-4 text-primary-foreground shadow-md">
      <CardHeader>
        <CardTitle>
          <div className="w-full">
            <Image
              src={`http://localhost:8000/${productData?.data?.product?.images[0].replace(
                "localhost:8000",
                ""
              )}`}
              alt={productData?.data?.product?.name}
              width={120}
              height={200}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col py-3 justify-between">
        <p className="text-lg truncate w-[220px]">
          {productData?.data?.product?.name}
        </p>
        <p className="flex gap-2 text-lg">
          <span className="font-semibold">
            {formatPrice(price * data.count)}
          </span>
          <span>{localization.toman}</span>
        </p>
      </CardContent>
      <CardFooter className="flex flex-col justify-between items-end py-2">
        <div
          className="hover:bg-secondary  p-2 rounded-full cursor-pointer"
          onClick={() => removeProduct(data.productId)}
        >
          <FaTrashAlt className="text-primary " />
        </div>
        <QuantityBtns productId={data.productId} />
      </CardFooter>
    </Card>
  );
}
