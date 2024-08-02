import { useEditProductImage } from "@/api/products/products.queries";
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
import { IProduct } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function EditForm({ productData }: { productData: IProduct }) {
  const [catId, setCatId] = useState(productData.category._id);
  const [images, setImages] = useState<FileList>();
  const { mutate } = useEditProductImage();
  const router = useRouter();

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
    images?: FileList;
  }) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("subcategory", data.subcategory);
    formData.append("category", data.category);

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append(`images`, images[i]);
      }
    }
    console.log(productData._id);
    mutate({ id: productData._id, data: formData });
  };
  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setImages(e.target.files);
      console.log(images);
    }
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
        <FormField
          control={control}
          name="images"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="shadow-md"
                  type="file"
                  multiple
                  {...field}
                  onChange={handleImages}
                  value={undefined}
                />
              </FormControl>
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
