import { useEditProduct } from "@/api/products/products.queries";
import { pageLevelLocalization } from "@/constants/localization";
import { IProduct } from "@/types";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function ViewrsScore({ data }: { data: IProduct }) {
  const [userRating, setUserRating] = useState(0);
  const { mutate } = useEditProduct();
  const rateNum =
    data?.rating.count === 0
      ? 0
      : (data?.rating.rate / data?.rating.count).toFixed(1);

  const handleRating = async (score: number) => {
    setUserRating(score);
    const _id = data._id;
    const rate = data.rating.rate + score
    const count = data.rating.count + 1;
    const rating = { rate, count };
    mutate({ _id, rating });
  };

  const renderStars = (score: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= score) {
        stars.push(<FaStar key={i} className="text-attention " />);
      } else {
        stars.push(<FaRegStar key={i} className="text-attention" />);
      }
    }
    return stars;
  };

  const renderUserStars = (score: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= score) {
        stars.push(
          <FaStar
            key={i}
            className="text-attention filled cursor-pointer"
            onClick={() => handleRating(i)}
          />
        );
      } else {
        stars.push(
          <FaRegStar
            key={i}
            className="text-attention cursor-pointer"
            onClick={() => handleRating(i)}
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className="flex flex-col gap-4 shadow-lg border rounded-3xl w-1/5 h-fit p-8 mt-20">
      <p className="flex gap-2 items-end">
        <span className="font-bold text-2xl">{rateNum}</span>از 5
      </p>
      <div className="flex gap-1">{renderStars(Math.floor(+rateNum))}</div>

      <p className="text-xs text-muted-foreground">
        {pageLevelLocalization.products.singleProduct.submitScore}
      </p>
      <hr />
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold">
          {pageLevelLocalization.products.singleProduct.scoreQuestion}
        </p>
        <div className="flex gap-1 justify-end">
          {renderUserStars(userRating)}
        </div>
      </div>
    </div>
  );
}
