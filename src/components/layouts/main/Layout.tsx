import { Header } from "@/components/layouts/admin/Header";
import Footer from "@/components/layouts/main/Footer";
import { ReactNode } from "react";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <Header />
      {children}
      <Footer />
    </section>
  );
}
