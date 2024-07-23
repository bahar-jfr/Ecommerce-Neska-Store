import { MainLayout } from "@/components/layouts/main/Layout";
import { ReactElement } from "react";

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-24">
      MAIN SECTION
    </main>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  <MainLayout>{page}</MainLayout>;
};
