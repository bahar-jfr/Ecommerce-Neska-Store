import { setUser } from "@/api/auth/auth.api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { pageLevelLocalization } from "@/constants/localization";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  firstname: yup
    .string()
    .required(
      `${pageLevelLocalization.auth.firstname} ${pageLevelLocalization.auth.require}`
    ),
  lastname: yup
    .string()
    .required(
      `${pageLevelLocalization.auth.lastname} ${pageLevelLocalization.auth.require}`
    ),
  username: yup
    .string()
    .required(
      `${pageLevelLocalization.auth.username} ${pageLevelLocalization.auth.require}`
    ),
  password: yup
    .string()
    .required(
      `${pageLevelLocalization.auth.password} ${pageLevelLocalization.auth.require}`
    )
    .min(
      8,
      `${pageLevelLocalization.auth.password} ${pageLevelLocalization.auth.minPass}`
    )
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)/,
      `${pageLevelLocalization.auth.password} ${pageLevelLocalization.auth.matchPass}`
    ),
  phonenumber: yup
    .string()
    .required(
      `${pageLevelLocalization.auth.phonenumber} ${pageLevelLocalization.auth.require}`
    ),
  address: yup
    .string()
    .required(
      `${pageLevelLocalization.auth.address} ${pageLevelLocalization.auth.require}`
    ),
});

export default function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    ""
  );
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: yupResolver(schema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: ISignUpSuccess) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const result = await registerate(formData);
    if ((result as ISignUpError)?.message) {
      setErrorMessage((result as ISignUpError).message);
    } /* else {
      setErrorMessage(undefined); // Handle successful registration (e.g., redirect to another page) }
    } */
  };

  const setSearchParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{pageLevelLocalization.auth.firstname}</FormLabel>
              <FormControl>
                <Input
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
            <FormItem>
              <FormLabel>{pageLevelLocalization.auth.lastname}</FormLabel>
              <FormControl>
                <Input
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
        <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{pageLevelLocalization.auth.username}</FormLabel>
              <FormControl>
                <Input
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
            <FormItem>
              <FormLabel>{pageLevelLocalization.auth.password}</FormLabel>
              <FormControl>
                <Input
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
        <FormField
          control={control}
          name="phonenumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{pageLevelLocalization.auth.phonenumber}</FormLabel>
              <FormControl>
                <Input
                  placeholder={pageLevelLocalization.auth.phonenumber}
                  {...field}
                />
              </FormControl>

              {errors.phonenumber && (
                <FormMessage>{errors.phonenumber.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{pageLevelLocalization.auth.address}</FormLabel>
              <FormControl>
                <Input
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
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <RegisterButton />
        <div
          onClick={() =>
            router.push(`${pathname}?${setSearchParams("action", "login")}`)
          }
        >
          {pageLevelLocalization.auth.goToLogin}
        </div>
      </form>
    </Form>
  );
}

function RegisterButton() {
  /*  const {
    formState: { isSubmitting },
  } = useForm(); */

  return (
    <Button
      /*   aria-disabled={isSubmitting} */
      type="submit"
      /*     className={isSubmitting ? "opacity-50 cursor-not-allowed" : ""} */
    >
      Register
    </Button>
  );
}

export interface ISignUpSuccess {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  phonenumber: string;
  address: string;
}

export interface ISignUpError {
  status: string;
  message: string;
}

export async function registerate(
  formData: FormData
): Promise<ISignUpSuccess | ISignUpError | undefined> {
  try {
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const phonenumber = formData.get("phonenumber") as string;
    const address = formData.get("address") as string;

    const res = await setUser("/auth/signup", {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      phonenumber: phonenumber,
      address: address,
    });
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      return { status: "error", message: error.response.data.message };
    } else if (error.request) {
      return { status: "error", message: "از سمت سرور پاسخی دریافت نشد" };
    } else {
      return { status: "error", message: "ثبت نام ناموفقیت آمیز بود" };
    }
  }
}
