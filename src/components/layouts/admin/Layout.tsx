import { Header } from "@/components/layouts/admin/Header";
import { ReactNode } from "react";

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <section className="pb-24">
        <Header />
        {children}
      </section>
    </>
  );
}
