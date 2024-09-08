import { useAddProduct } from "@/api/products/products.queries";
import { SelectItems } from "@/components/product-data/add-product/Select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addProductSchema } from "@/constants/formSchema";
import { localization, pageLevelLocalization } from "@/constants/localization";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddProductForm() {
  const [catId, setCatId] = useState("");
  const [images, setImages] = useState<FileList>();
  const { mutate } = useAddProduct();
  /*  let fileList: File[] = []; */

  const form = useForm({
    resolver: yupResolver(addProductSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const onSubmit = async (data: {
    name: string;
    brand: string;
    price: number;
    quantity: number;
    discount: number;
    description: string;
    subcategory: string;
    category: string;
    images?: FileList;
  }) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("price", `${data.price}`);
    formData.append("discount", `${data.discount}`);
    formData.append("quantity", `${data.quantity}`);
    formData.append("description", data.description);
    formData.append("subcategory", data.subcategory);
    formData.append("category", data.category);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append(`images`, images[i]);
      }
    }

    /*    const addProductData: IAddProduct = {
      name: formData.get("name") as string,
      brand: formData.get("brand") as string,
      price: Number(formData.get("price")),
      quantity: Number(formData.get("quantity")),
      discount: Number(formData.get("discount")),
      description: formData.get("description") as string,
      subcategory: formData.get("subcategory") as string,
      category: formData.get("category") as string,
      images: filelist,
    }; */

    mutate(formData);
    reset();
  };

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setImages(e.target.files);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white space-y-12 border-2  shadow-inner rounded-lg p-8 "
      >
        <div className="flex gap-3">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-2/3">
                <FormControl>
                  <Input
                    className="shadow-md"
                    placeholder={`${localization.productName}`}
                    {...field}
                  />
                </FormControl>
                {errors.name && (
                  <FormMessage>{errors.name.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="brand"
            render={({ field }) => (
              <FormItem className="w-1/3 pr-2.5">
                <FormControl>
                  <Input
                    className="shadow-md"
                    placeholder={`${pageLevelLocalization.productsData.brand}`}
                    {...field}
                  />
                </FormControl>
                {errors.brand && (
                  <FormMessage>{errors.brand.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-5">
          <FormField
            control={control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="shadow-md"
                    placeholder={localization.price}
                    {...field}
                  />
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
                    className="shadow-md"
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
                    className="shadow-md"
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
        <div className="flex gap-5">
          {" "}
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="shadow-md"
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
                {errors.images && (
                  <FormMessage>{errors.images.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="text-white">
          {pageLevelLocalization.productsData.submit}
        </Button>
      </form>
    </Form>
  );
}
