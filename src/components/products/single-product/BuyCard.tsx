import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { localization, pageLevelLocalization } from "@/constants/localization";
import { IProduct } from "@/types";
import { formatPrice } from "@/utils/formats";
import { FaRegHeart } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";

export default function BuyCard({ data }: { data: IProduct }) {
  const finalPrice = data?.price - (data?.price * data?.discount) / 100;
  const Satisfaction =
    data?.rating.count === 0
      ? 0
      : (((data?.rating.rate / data?.rating.count) * 100) / 5).toFixed(1);

  const gradeLocalization = {
    weak: pageLevelLocalization.products.singleProduct.weak,
    medium: pageLevelLocalization.products.singleProduct.medium,
    strong: pageLevelLocalization.products.singleProduct.strong,
  };

  const grade = (() => {
    if (+Satisfaction >= 0 && +Satisfaction < 40) return "weak";
    else if (+Satisfaction >= 40 && +Satisfaction < 70) return "medium";
    else return "strong";
  })();

  const gradeColor = (() => {
    if (+Satisfaction >= 0 && +Satisfaction < 40) return "text-red-500";
    else if (+Satisfaction >= 40 && +Satisfaction < 70) return "text-attention";
    else return "text-success";
  })();

  return (
    <Card className="text-primary-foreground  flex flex-col gap-6 px-12 py-10 w-1/4 h-3/6 ">
      <CardHeader className="flex flex-col gap-4">
        <CardTitle className="text-xl">
          {pageLevelLocalization.products.singleProduct.importProduct}
        </CardTitle>
        <hr />
        <CardDescription className="flex flex-col gap-3 pb-4">
          <div>
            <span className={` font-semibold ${gradeColor}`}>
              {" "}
              {Satisfaction}%{" "}
            </span>
            {pageLevelLocalization.products.singleProduct.Satisfaction} |{" "}
            {pageLevelLocalization.products.singleProduct.process}{" "}
            <span className={`${gradeColor}`}>{gradeLocalization[grade]}</span>
          </div>
          <div className="flex gap-2 items-center">
            <GoShieldCheck />
            <p>{pageLevelLocalization.products.singleProduct.guarantee}</p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row-reverse items-center">
          <div className="flex flex-col gap-2 w-full items-end">
            <p
              className={`  ${
                data?.discount !== 0
                  ? "line-through opacity-50 text-sm"
                  : "text-lg"
              } `}
            >
              <span className="font-semibold">{formatPrice(data?.price)}</span>
              <span> {localization.toman}</span>
            </p>
            {data?.discount !== 0 ? (
              <div className="flex ">
                <p className="text-primary-foreground flex gap-1 ">
                  <span className="font-semibold text-lg">
                    {formatPrice(finalPrice)}
                  </span>
                  <span>{localization.toman}</span>
                </p>
                <p></p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className=" border-2 rounded-lg p-2">
            <FaRegHeart />
            {/*   <FaHeart /> */}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {data?.quantity !== 0 ? (
          <Button className="text-white w-full">
            {pageLevelLocalization.products.singleProduct.addToCart}
          </Button>
        ) : (
          <Button disabled className="text-white disabled:opacity-50 w-full">
            {pageLevelLocalization.products.nonexistent}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
