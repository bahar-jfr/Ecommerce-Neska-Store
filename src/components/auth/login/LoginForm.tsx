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
import { pageLevelLocalization } from "@/constants/localization";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
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
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: yupResolver(schema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: { username: string; password: string }) => {
    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("password", data.password);

    const error = await authenticate(formData);
    if (error) {
      console.log(error);
      setErrorMessage(error);
    } else {
      router.push("/");
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
        <form className="border shadow-md rounded-xl py-20 px-12 flex flex-col gap-4 w-1/3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center pb-8"><Image height={90} width={100} src="./text.svg" alt="logo's text"/></div>
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
          <div>{errorMessage && <p>{errorMessage}</p>}</div>
          <Button className="text-white" type="submit">{pageLevelLocalization.auth.login}</Button>
          <div className="cursor-pointer text-sm text-tertiary hover:font-semibold pt-2 "
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

export async function authenticate(
  formData: FormData
): Promise<string | undefined> {
  try {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const response = await setUser("/auth/login", {
      username: username,
      password: password,
    });

    const { accessToken, refreshToken } = response.data.token;
    const role = response.data.data.user.role;
    setCookie("accessToken", accessToken);
    setCookie("refreshToken", refreshToken);
    setCookie("role", role);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return "دسترسی نامعتبر است ";
      }
    }
    return "خطایی رخ داده است ";
  }
}
