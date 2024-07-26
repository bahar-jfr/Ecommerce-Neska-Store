import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productSchema } from "@/constants/formSchema";
import { localization, pageLevelLocalization } from "@/constants/localization";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SelectItems } from "@/components/product-data/Select";

export default function EditForm() {
  const form = useForm({
    resolver: yupResolver(productSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: {
    name: string;
    price: number;
    quantity: number;
    discount: number;
    description: string;
    subcategory: string;
    category: string;
  }) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", `${data.price}`);
    formData.append("discount", `${data.discount}`);
    formData.append("quantity", `${data.quantity}`);
    formData.append("description", data.description);
    formData.append("description", data.subcategory);
    formData.append("description", data.category);

    /*   await youreditfunction(formData) */
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={`${localization.productName}`} {...field} />
              </FormControl>
              {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
            </FormItem>
          )}
        />
        <div className="flex gap-5">
          <FormField
            control={control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder={localization.price} {...field} />
                </FormControl>
                {errors.price && (
                  <FormMessage>{errors.price.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder={pageLevelLocalization.productsData.quantity}
                    {...field}
                  />
                </FormControl>
                {errors.quantity && (
                  <FormMessage>{errors.quantity.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="discount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder={pageLevelLocalization.productsData.discount}
                    {...field}
                  />
                </FormControl>
                {errors.discount && (
                  <FormMessage>{errors.discount.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-5 ">
          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <SelectItems
                    name="category"
                    control={field}
                    placeholder={`${localization.category}`}
                  />
                </FormControl>
                {errors.category && (
                  <FormMessage>{errors.category.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="subcategory"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <SelectItems
                    name="subcategory"
                    control={field}
                    placeholder={`${localization.subcategory}`}
                  />
                </FormControl>
                {errors.subcategory && (
                  <FormMessage>{errors.subcategory.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder={pageLevelLocalization.productsData.description}
                  {...field}
                />
              </FormControl>
              {errors.description && (
                <FormMessage>{errors.description.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <Button type="submit" className="text-white">
          {pageLevelLocalization.productsData.submit}
        </Button>
      </form>
    </Form>
  );
}
