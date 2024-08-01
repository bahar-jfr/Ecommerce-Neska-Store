import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { localization, pageLevelLocalization } from "@/constants/localization";
import { formatPrice } from "@/lib/utils";
import { IProduct } from "@/types";
import Aos, * as AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function DiscountCard({ data }: { data: IProduct }) {
  const finalPrice = data.price - (data.price * data.discount) / 100;

  useEffect(() => {
    Aos.init();
    AOS.refresh();
  }, []);

  return (
    <Link href={{ pathname: "/products/[id]", query: { id: data._id } }}>
      <Card
        className="h-full w-fit rounded-2xl p-6  shadow-md cursor-pointer hover:shadow-lg"
        data-aos="zoom-in-up"
        data-aos-duration="500"
        data-aos-delay="300"
      >
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-center">
              <Image
                src={`http://localhost:8000/${data?.images[0].replace(
                  "localhost:8000",
                  ""
                )}`}
                alt={data.name}
                width={170}
                height={170}
              />
            </div>
          </CardTitle>
          <CardDescription>
            {data.category.name}/{data.subcategory.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2 text-primary-foreground font-semibold truncate w-48">
          {data.name}
        </CardContent>
        <CardFooter className="pt-4">
          <div className="flex items-center justify-between w-full">
            {data.quantity !== 0 ? (
              <div className="flex flex-col">
                <p
                  className={`text-primary-foreground  ${
                    data.discount !== 0 ? "line-through opacity-60 text-sm" : ""
                  }`}
                >
                  <span className="font-semibold">
                    {formatPrice(data.price)}
                  </span>
                  <span> {localization.toman}</span>
                </p>
                {data.discount !== 0 ? (
                  <p className="text-primary-foreground flex gap-1 ">
                    <span className="font-semibold">
                      {formatPrice(finalPrice)}
                    </span>
                    <span>{localization.toman}</span>
                  </p>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div className="text-quaternary-foreground text-lg font-bold">
                {pageLevelLocalization.products.nonexistent}
              </div>
            )}
            <div className="flex  flex-row-reverse items-center gap-2">
            <Badge className="text-white bg-attention">{data.discount} %</Badge>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
