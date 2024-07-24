import { Header } from "@/components/layouts/admin/Header";
import { ReactNode } from "react";

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main>
        <Header />
        {children}
      </main>
    </>
  );
}
