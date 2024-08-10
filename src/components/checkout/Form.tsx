import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { checkoutSchema } from "@/constants/formSchema";
import { pageLevelLocalization } from "@/constants/localization";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CheckoutForm() {
  const form = useForm({
    resolver: yupResolver(checkoutSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: {
    firstName: string;
    lastName:string;
    address: string;
    postal: string;
    phonenumber:string;
  }) => {
   
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 border-2 rounded-lg p-8 w-3/4 shadow-[0px_3px_10px_1px_rgb(0,0,0,0.1)]"
      >
        <div className="text-lg font-semibold">{pageLevelLocalization.checkout.receiver}</div>
        <div className="flex gap-3">
        
          <FormField
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-2/3">
                <Label>{pageLevelLocalization.auth.firstname} :</Label>
                <FormControl>
                  <Input
                    className="shadow-md"
                    placeholder={`${pageLevelLocalization.auth.firstname} ${pageLevelLocalization.auth.enter}`}
                    {...field}
                  />
                </FormControl>
                {errors.firstName && (
                  <FormMessage>{errors.firstName.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-2/3">
                <Label>{pageLevelLocalization.auth.lastname} :</Label>
                <FormControl>
                  <Input
                    className="shadow-md"
                    placeholder={`${pageLevelLocalization.auth.lastname} ${pageLevelLocalization.auth.enter}`}
                    {...field}
                  />
                </FormControl>
                {errors.lastName && (
                  <FormMessage>{errors.lastName.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem className="w-full">
              <Label>{pageLevelLocalization.auth.address} :</Label>
              <FormControl>
                <Input className="shadow-md" placeholder={`${pageLevelLocalization.auth.address} ${pageLevelLocalization.auth.enter}`} {...field} />
              </FormControl>
              {errors.address && (
                <FormMessage>{errors.address.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
       
        <div className="flex gap-3">
        <FormField
            control={control}
            name="postal"
            render={({ field }) => (
              <FormItem className="w-full">
                <Label>{pageLevelLocalization.auth.postal} :</Label>
                <FormControl>
                  <Input className="shadow-md" placeholder={`${pageLevelLocalization.auth.postal} ${pageLevelLocalization.auth.enter}`} {...field} />
                </FormControl>
                {errors.postal && <FormMessage>{errors.postal.message}</FormMessage>}
              </FormItem>
            )}
          />
           <FormField
            control={control}
            name="phonenumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <Label>{pageLevelLocalization.auth.phonenumber} :</Label>
                <FormControl>
                  <Input className="shadow-md" placeholder={`${pageLevelLocalization.auth.phonenumber} ${pageLevelLocalization.auth.enter}`} {...field} />
                </FormControl>
                {errors.phonenumber && <FormMessage>{errors.phonenumber.message}</FormMessage>}
              </FormItem>
            )}
          />
        </div>
       
        <Button className="text-white w-1/12 " type="submit">
          {pageLevelLocalization.cart.submit}
        </Button>
      </form>
    </Form>
  );
}
