import { setUser } from "@/api/auth/auth.api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { signupSchema } from "@/constants/formSchema";
import { pageLevelLocalization } from "@/constants/localization";
import { useUserStore } from "@/store";
import { ISignUpSuccess, UserState } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function SignUpForm() {
  const { setUser} = useUserStore() as UserState;
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: yupResolver(signupSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (userData: ISignUpSuccess) => {
    try {
      const response = await registerate(userData);
      toast({
        variant: variant(response),
        title: handleResponse(response),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleResponse = (response: any) => {
    if (response?.data.status === "fail") {
      const errorMessage = response.data.message;
      if (
        errorMessage ===
        "username is already taken. choose a different username"
      ) {
        return pageLevelLocalization.auth.usernameError;
      } else if (errorMessage === "phoneNumber is already exists.") {
        return pageLevelLocalization.auth.phoneError;
      } else {
        return pageLevelLocalization.auth.error;
      }
    } else {
      const user = response.data.data.user;
      setUser(user);
      const { accessToken, refreshToken } = response.data.token;
      const role = response.data.data.user.role;
      setCookie("accessToken", accessToken);
      setCookie("refreshToken", refreshToken);
      setCookie("role", role);
      router.push("/");
      return pageLevelLocalization.auth.success;
    }
  };

  const variant = (response: any) => {
    return response?.data.status === "fail" ? "destructive" : "success";
  };

  const setSearchParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  };

  return (
    <div className="flex justify-center mt-24 ">
      <Form {...form}>
        <form
          className="border shadow-md rounded-xl py-16 px-12 flex flex-col gap-4 w-1/2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-center pb-8">
            <Image height={90} width={100} src="./text.svg" alt="logo's text" />
          </div>
          <div className="flex gap-6">
            <FormField
              control={control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className="h-12 "
                      placeholder={pageLevelLocalization.auth.firstname}
                      {...field}
                    />
                  </FormControl>

                  {errors.firstname && (
                    <FormMessage>{errors.firstname.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className="h-12"
                      placeholder={pageLevelLocalization.auth.lastname}
                      {...field}
                    />
                  </FormControl>

                  {errors.lastname && (
                    <FormMessage>{errors.lastname.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-6">
            {" "}
            <FormField
              control={control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className="h-12"
                      placeholder={pageLevelLocalization.auth.username}
                      {...field}
                    />
                  </FormControl>

                  {errors.username && (
                    <FormMessage>{errors.username.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className="h-12"
                      type="password"
                      placeholder={pageLevelLocalization.auth.password}
                      {...field}
                    />
                  </FormControl>

                  {errors.password && (
                    <FormMessage>{errors.password.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-6">
            <FormField
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className="h-12"
                      placeholder={pageLevelLocalization.auth.phonenumber}
                      {...field}
                    />
                  </FormControl>

                  {errors.phoneNumber && (
                    <FormMessage>{errors.phoneNumber.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className="h-12"
                      placeholder={pageLevelLocalization.auth.address}
                      {...field}
                    />
                  </FormControl>

                  {errors.address && (
                    <FormMessage>{errors.address.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>
          <Button className="text-white" type="submit">
            {pageLevelLocalization.auth.signup}
          </Button>
          <div
            className="cursor-pointer text-sm text-tertiary hover:font-semibold "
            onClick={() =>
              router.push(`${pathname}?${setSearchParams("action", "login")}`)
            }
          >
            {pageLevelLocalization.auth.goToLogin}
          </div>
        </form>
      </Form>
    </div>
  );
}

const registerate = async (data: ISignUpSuccess) => {
  try {
    const response = await setUser("/auth/signup", data);
    return response;
  } catch (error: any) {
    console.log(error);
  }
};
