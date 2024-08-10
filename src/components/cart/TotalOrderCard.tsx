import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { pageLevelLocalization } from "@/constants/localization";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store";
import Link from "next/link";
import { useState } from "react";

export default function TotalOrderCard() {
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const { updateTotalPrice, totalPrice, originalTotalPrice } = useCartStore();

  const discounts: { [key: string]: number } = {
    DISCOUNT10: 10,
    DISCOUNT20: 20,
  };

  const validateDiscountCode = (code: string) => {
    return discounts[code.toUpperCase() as keyof typeof discounts] || 0;
  };

  const handleDiscount = () => {
    const discount = validateDiscountCode(discountCode);
    if (discount) {
      setDiscountAmount(discount);
      updateTotalPrice(
        originalTotalPrice - (originalTotalPrice * discount) / 100
      );
    } else {
      setDiscountAmount(0);
      updateTotalPrice(originalTotalPrice);
    }
  };

  return (
    <Card className="text-primary-foreground px-6 py-8 shadow-[0px_3px_10px_1px_rgb(0,0,0,0.1)]">
      <CardHeader className="flex flex-col gap-2">
        <CardDescription>
          {pageLevelLocalization.cart.discountDesc}
        </CardDescription>
        <div className="flex gap-4">
          <Input
            placeholder="کد تخفیف"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <Button className="text-white" onClick={handleDiscount}>
            {pageLevelLocalization.cart.submit}
          </Button>
        </div>
      </CardHeader>
      <hr className="mt-4" />
      <CardContent className="flex flex-col gap-4 py-6">
        <div className="flex  justify-between">
          <p>{pageLevelLocalization.cart.productsPrice} :</p>
          <p>{formatPrice(originalTotalPrice)}</p>
        </div>
        <div
          className={`flex  justify-between ${
            discountAmount ? "text-success" : ""
          }`}
        >
          <p>{pageLevelLocalization.cart.discount} :</p>
          <p>{formatPrice((originalTotalPrice * discountAmount) / 100)}</p>
        </div>
        <div className="flex  justify-between">
          <p>{pageLevelLocalization.cart.totalPrice} :</p>
          <p>{formatPrice(totalPrice)}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={"/checkout"} className="w-full">
          <Button className="text-white w-full">
            {pageLevelLocalization.cart.submit} و{" "}
            {pageLevelLocalization.cart.finalizeOrder}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
