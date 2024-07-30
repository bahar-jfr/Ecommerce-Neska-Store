import Footer from "@/components/layouts/main/Footer";
import { ReactNode } from "react";
import Header from "@/components/layouts/main/Header";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <Header />
      {children}
      <Footer />
    </section>
  );
}
