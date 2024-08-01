import { useEditProduct } from "@/api/products/products.queries";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { pageLevelLocalization } from "@/constants/localization";
import { fromFormDataToObject } from "@/lib/utils";
import { IProduct } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AlertModal from "./AlertModal";

const schema = yup.object().shape({
  comments: yup.string(),
});

export default function ViewersComments({ data }: { data: IProduct }) {
  const { mutate } = useEditProduct();
  const accessToken = getCookie("accessToken");
  console.log(data);
  const form = useForm({
    resolver: yupResolver(schema),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = async (commentData: any) => {
   
    const updatedProduct = {
      _id: data._id,
      comments: [commentData.comments],
    };
 
    if (commentData.comments != "") {
      mutate(updatedProduct);
    } else {
      toast({
        variant: "destructive",
        title: `${pageLevelLocalization.products.singleProduct.noComment}`,
      });
    }

    reset({
      comments: "", // Reset the textarea value to an empty string
    });
  };

  return (
    <div className="pl-12 py-16 flex flex-col gap-6 w-4/5 ">
      <p className="text-lg font-semibold border-b-2 w-fit pb-2">
        {pageLevelLocalization.products.singleProduct.viewersComments}
      </p>
      <Form {...form}>
        <form
          className="  px-12 pt-10 flex flex-col gap-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={control}
            name="comments"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <textarea
                    className="bg-accent p-4 rounded-2xl w-full outline-none"
                    placeholder="دیدگاه شما ..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {accessToken ? (
            <Button className="w-fit text-white">
              {pageLevelLocalization.products.singleProduct.submitComment}
            </Button>
          ) : (
            <AlertModal />
          )}
        </form>
      </Form>

      {data?.comments && data?.comments.length > 0
        ? data?.comments.map((comment) => {
            return (
              <div className="flex flex-col gap-3 pr-4 pt-6 mr-16 border-t-2 ">
                <p className="text-primary bg-secondary w-fit p-1 rounded-full">{pageLevelLocalization.products.singleProduct.user}</p>
                <p className="pr-6 text-lg ">{comment}</p>
              </div>
            );
          })
        : ""}
    </div>
  );
}
