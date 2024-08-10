import { useAddOrder } from "@/api/orders/orders.queries";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pageLevelLocalization } from "@/constants/localization";
import { useCartStore, useUserStore } from "@/store";
import { UserState } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

export default function PaymentForm() {
  const { mutate: addOrder } = useAddOrder();
  const { products, totalPrice } = useCartStore();
  const { user } = useUserStore() as UserState;
  const router = useRouter();
  const { ...form } = useForm();
  const searchParams = useSearchParams();

  const setSearchParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  };

  const handleAddOrder = async () => {
    const response = await addOrder(
      {
        user: `${user?._id}`,
        products: products.map((product) => {
          return {
            product: `${product.productId}`,
            count: `${product.count}`,
          };
        }),
        deliveryStatus: false,
        totalPrice: totalPrice,
      },
      {
        onSuccess: (data) => {
          if (data.status === "success") {
            router.push(
              `/payment/result?${setSearchParams("status", "success")}`
            );
            localStorage.removeItem("cart-storage");
          }
        },
      }
    );
  };

  const handleCancelOrder = () => {
    router.push(`/payment/result?${setSearchParams("status", "cancel")}`);
  };

  return (
    <div className="w-1/2 space-y-4 p-10 rounded-lg bg-white text-primary-foreground">
      <div className="text-lg font-semibold">
        {pageLevelLocalization.payment.cartInfo}
      </div>
      <Form {...form}>
        <FormField
          name="cardNumber"
          render={({ field }) => (
            <FormItem className="w-full">
              <Label>{pageLevelLocalization.payment.cartNumber} :</Label>
              <FormControl>
                <Input
                  className="shadow-md"
                  placeholder={`${pageLevelLocalization.payment.cartNumber} ${pageLevelLocalization.payment.enter}`}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="secondVerificationNumber"
          render={({ field }) => (
            <FormItem className="w-full">
              <Label> {pageLevelLocalization.payment.cvv2} :</Label>
              <FormControl>
                <Input
                  className="shadow-md"
                  placeholder={`${pageLevelLocalization.payment.cvv2} ${pageLevelLocalization.payment.enter}`}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="expirationDate"
          render={({ field }) => (
            <FormItem className="w-full">
              <Label> {pageLevelLocalization.payment.expire} :</Label>
              <FormControl>
                <Input
                  className="shadow-md"
                  type="text"
                  placeholder="01 / 04"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="secondPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <Label> {pageLevelLocalization.payment.secondPass} :</Label>
              <FormControl>
                <Input
                  className="shadow-md"
                  type="password"
                  placeholder={`${pageLevelLocalization.payment.secondPass} ${pageLevelLocalization.payment.enter}`}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <Label> {pageLevelLocalization.payment.email} :</Label>
              <FormControl>
                <Input
                  className="shadow-md"
                  type="email"
                  placeholder={`${pageLevelLocalization.payment.email} ${pageLevelLocalization.payment.enter}`}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="w-full flex gap-6 pt-4">
          <Button
            type="submit"
            className="text-white w-full"
            onClick={handleAddOrder}
          >
            {pageLevelLocalization.payment.pay}
          </Button>
          <Button
            type="submit"
            className="bg-attention hover:bg-attention hover:opacity-90 text-white w-full"
            onClick={handleCancelOrder}
          >
            {pageLevelLocalization.payment.cancel}
          </Button>
        </div>
      </Form>
    </div>
  );
}
