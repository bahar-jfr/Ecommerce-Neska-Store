import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store";

export default function QuantityBtns({ productId }: { productId: string }) {
  const { updateCount, removeProduct, products } = useCartStore();
  const productInCart = products.find(
    (product) => product.productId === productId
  );
  const count = productInCart ? productInCart.count : 1;

  const handleQuantity = async (increment: boolean) => {
    if (increment) {
      updateCount(productId, count + 1);
    } else {
      if (count > 1) {
        updateCount(productId, count - 1);
      } else {
        removeProduct(productId);
      }
    }
  };

  return (
    <div className="flex items-center text-white">
      <Button
        size="sm"
        className="flex items-start justify-start bg-primary rounded-r-xl rounded-l-none text-white w-6  text-lg"
        onClick={() => handleQuantity(true)}
      >
        +
      </Button>
      <p className="flex items-center justify-center bg-primary border-2 border-primary h-6 w-6 font-semibold text-lg px-4">
        {count}
      </p>
      <Button
        size="sm"
        className="flex items-start justify-start bg-primary rounded-l-xl rounded-r-none text-white w-6  text-lg"
        onClick={() => {
          handleQuantity(false);
        }}
      >
        -
      </Button>
    </div>
  );
}
