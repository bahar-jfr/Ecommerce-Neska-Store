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
import { pageLevelLocalization } from "@/constants/localization";
import { useUserStore } from "@/store";
import { UserState } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  username: yup
    .string()
    .required(
      `${pageLevelLocalization.auth.username} ${pageLevelLocalization.auth.require}`
    ),
  password: yup
    .string()
    .required(
      `${pageLevelLocalization.auth.password} ${pageLevelLocalization.auth.require}`
    ),
});

export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const { setUser } = useUserStore() as UserState;

  const form = useForm({
    resolver: yupResolver(schema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      const response = await authenticate(data);

      if (response?.data.status === "fail") {
        const errorMessage = response.data.message;
        if (errorMessage === "incorrect username or password") {
          toast({
            variant: "success",
            title: pageLevelLocalization.auth.passError,
          });
        }
      } else {
        setUser(response.data.data.user);
        toast({
          variant: "success",
          title: pageLevelLocalization.auth.welcome,
        });
      }

      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message,
      });
    }
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
          className="border shadow-md rounded-xl py-20 px-12 flex flex-col gap-4 w-1/3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-center pb-8">
            <Image height={90} width={100} src="./text.svg" alt="logo's text" />
          </div>
          <FormField
            control={control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-12"
                    placeholder={pageLevelLocalization.auth.username}
                    {...field}
                  />
                </FormControl>

                <FormMessage>{errors.username?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-12"
                    type="password"
                    placeholder={pageLevelLocalization.auth.password}
                    {...field}
                  />
                </FormControl>

                <FormMessage>{errors.password?.message}</FormMessage>
              </FormItem>
            )}
          />

          <Button className="text-white" type="submit">
            {pageLevelLocalization.auth.login}
          </Button>
          <div
            className="cursor-pointer text-sm text-tertiary hover:font-semibold pt-2 "
            onClick={() =>
              router.push(`${pathname}?${setSearchParams("action", "signup")}`)
            }
          >
            {pageLevelLocalization.auth.goToSignUp}
          </div>
        </form>
      </Form>
    </div>
  );
}

// function

export async function authenticate(data: {
  username: string;
  password: string;
}) {
  try {
    const response = await setUser("/auth/login", data);
    const { accessToken, refreshToken } = response.data.token;
    const role = response.data.data.user.role;
    setCookie("accessToken", accessToken);
    setCookie("refreshToken", refreshToken);
    setCookie("role", role);
    return response;
  } catch (error: any) {
    throw error;
  }
}
