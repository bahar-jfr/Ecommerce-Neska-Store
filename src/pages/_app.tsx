import { localization, pageLevelLocalization } from "@/constants/localization";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

const getTitle = (pathname: string) => {
  switch (pathname) {
    case "/":
      return `${localization.mainPage}`;
    case "/auth":
      return ` ${pageLevelLocalization.auth.login} | ${pageLevelLocalization.auth.signup}`;
    case "/dashboard":
      return `${localization.adminPanel}`;
    default:
      return ` ${localization.store} ${localization.brand}`;
  }
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const title = getTitle(router.pathname);
    document.title = title;
  }, [router.pathname]);
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}
