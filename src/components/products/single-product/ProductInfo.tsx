import { pageLevelLocalization } from "@/constants/localization";
import { IProduct } from "@/types";
import { FaStar } from "react-icons/fa";

export default function ProductInfo({ data }: { data: IProduct }) {
  const rate =
    data?.rating.count === 0
      ? 0
      : (data?.rating.rate / data?.rating.count).toFixed(1);
  return (
    <div className="text-primary-foreground w-1/3 flex flex-col gap-5">
      <div className="flex flex-col gap-2.5">
        <p className="text-quaternary-foreground font-semibold">
          {data?.category.name} / {data?.subcategory.name}
        </p>
        <h1 className="text-2xl font-bold">{data?.name}</h1>
      
      </div>
      <hr />
      <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1 text-sm ">
          <FaStar className="text-attention" />
          <p className="text-primary-foreground">{rate}</p>
          <p className="text-primary-foreground opacity-60 text-xs">
            ( {pageLevelLocalization.products.singleProduct.points}{" "}
            {data?.rating.count}{" "}
            {pageLevelLocalization.products.singleProduct.buyer})
          </p>
        </div>
        <p>
          <span className="font-semibold">{pageLevelLocalization.products.singleProduct.brand} : </span>
          {data?.brand}
        </p>
        <div className="flex flex-col gap-3">
          <p className="font-semibold">{pageLevelLocalization.products.singleProduct.description} : </p>
          <p className="pr-20 pl-8 leading-loose tracking-wide ">{data?.description}</p>
        </div>
      </div>
    </div>
  );
}
