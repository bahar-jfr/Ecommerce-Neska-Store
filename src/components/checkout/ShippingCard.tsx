import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { localization, pageLevelLocalization } from "@/constants/localization";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ShippingCard() {
  const { totalPrice, updateTotalPrice } = useCartStore();
  const [shippingPrice, setShippingPrice] = useState(0);

  const handleRadioChange = (event: string) => {
    let newShippingPrice = 0;
    if (event === "normalSend") {
      newShippingPrice = 55000;
    } else if (event === "fastSend") {
      newShippingPrice = 120000;
    }
    updateTotalPrice(totalPrice - shippingPrice + newShippingPrice);
    setShippingPrice(newShippingPrice);
  };

  return (
    <Card className="text-primary-foreground px-6 py-8 shadow-[0px_3px_10px_1px_rgb(0,0,0,0.1)] w-1/4">
      <CardHeader className="flex flex-col gap-2">
        <RadioGroup onValueChange={handleRadioChange}>
          <div className="flex justify-between items-center gap-2 border-2 rounded-md px-4 py-2 ">
            <RadioGroupItem value="normalSend" id="normalSend" />
            <Label
              className="flex flex-col items-end gap-2"
              htmlFor="normalSend"
            >
              <p className="text-lg">
                {pageLevelLocalization.checkout.normalSend}
              </p>
              <p className="pr-12 flex flex-row-reverse gap-2">
                <span>{formatPrice(55000)}</span>
                <span>{localization.toman}</span>
              </p>
            </Label>
          </div>
          <div className="flex justify-between items-center gap-2 border-2 rounded-md px-4 py-2 ">
            <RadioGroupItem value="fastSend" id="fastSend" />
            <Label className="flex flex-col items-end gap-2" htmlFor="fastSend">
              <p className="text-lg">
                {pageLevelLocalization.checkout.fastSend}
              </p>
              <p className="pr-12 flex flex-row-reverse gap-2">
                <span>{formatPrice(120000)}</span>
                <span>{localization.toman}</span>
              </p>
            </Label>
          </div>
        </RadioGroup>
      </CardHeader>
      <hr className="mt-4" />
      <CardContent className="flex flex-col gap-4 py-6">
        <div className="flex  justify-between">
          <p>{pageLevelLocalization.cart.totalPrice} :</p>
          <p>{formatPrice(totalPrice)}</p>
        </div>
      </CardContent>
      <CardFooter>
        <a href={"/payment"} className="w-full">
          <Button className="text-white w-full">
            {pageLevelLocalization.checkout.pay}
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
