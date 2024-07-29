import { useEditProduct } from "@/api/products/products.queries";
import { SelectItems } from "@/components/product-data/Select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editProductSchema } from "@/constants/formSchema";
import { localization, pageLevelLocalization } from "@/constants/localization";
import { fromFormDataToObject } from "@/lib/utils";
import { IProduct } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function EditForm({ productData }: { productData: IProduct }) {
  const [catId, setCatId] = useState(productData.category._id);
  const { mutate } = useEditProduct();
  const form = useForm({
    resolver: yupResolver(editProductSchema),
    defaultValues: {
      name: productData.name,
      description: productData.description,
      category: catId,
      subcategory: productData.subcategory._id,
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: {
    name: string;
    description: string;
    subcategory: string;
    category: string;
  }) => {
    const formData = new FormData();

    formData.append("_id", productData._id);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("subcategory", data.subcategory);
    formData.append("category", data.category);

    const productObject = fromFormDataToObject(formData);
   mutate(productObject);

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
                    setCatId={setCatId}
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
                    catId={catId}
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
