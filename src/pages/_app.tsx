import { localization, pageLevelLocalization } from "@/constants/localization";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect } from "react";

const getTitle = (pathname: string) => {
  switch (pathname) {
    case "/":
      return `${localization.mainPage}`;
    case "/auth":
      return ` ${pageLevelLocalization.auth.login} | ${pageLevelLocalization.auth.signup}`;
    case "/dashboard":
      return `${localization.adminPanel}`;
    case "/dashboard/product-data":
      return `${localization.adminPanel}`;
    case "/dashboard/inventory-data":
      return `${localization.adminPanel}`;
    case "/dashboard/delivary-data":
      return `${localization.adminPanel}`;
    default:
      return ` ${localization.store} ${localization.brand}`;
  }
};

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
      retryOnMount: false,
      refetchInterval: false,
    },
  },
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const router = useRouter();
  useEffect(() => {
    const title = getTitle(router.pathname);
    document.title = title;
  }, [router.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      {getLayout(<Component {...pageProps} />)}
    </QueryClientProvider>
  );
}
