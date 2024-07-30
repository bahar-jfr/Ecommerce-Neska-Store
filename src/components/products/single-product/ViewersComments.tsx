import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { pageLevelLocalization } from "@/constants/localization";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  comments: yup.string(),
});

export default function ViewersComments() {
  const form = useForm({
    resolver: yupResolver(schema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("comments", data.comments);
  };

  return (
    <div className="px-24 py-16">
      <p className="text-lg font-semibold border-b-2 w-fit pb-2">
        {pageLevelLocalization.products.singleProduct.viewersComments}
      </p>
      <Form {...form}>
        <form
          className="  px-12 pt-10 flex flex-col gap-4 w-1/2"
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
          <Button className="w-fit text-white">
            {pageLevelLocalization.products.singleProduct.submitComment}
          </Button>
        </form>
      </Form>
    </div>
  );
}
