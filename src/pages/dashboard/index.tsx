import { BarChartSingle } from "@/components/dashboard/charts/BarChart";
import { CalendarDemo } from "@/components/dashboard/charts/Calendar";
import { LineChartMultiple } from "@/components/dashboard/charts/LineChart";
import { PieChartDonut } from "@/components/dashboard/charts/PieChart";
import SummaryBoxs from "@/components/dashboard/SummaryBoxs";
import { AdminLayout } from "@/components/layouts/admin/Layout";
import { pageLevelLocalization } from "@/constants/localization";
import { ReactElement } from "react";

export default function DashboardPage() {
  return (
    <div className="bg-secondary min-h-screen px-24 flex flex-col gap-8 pb-24 text-primary-foreground">
      <h1 className="font-bold text-3xl text-primary-foreground pt-6">
        {pageLevelLocalization.dashboard.dashboard}
      </h1>
      <section className="flex w-full gap-7">
        <SummaryBoxs />
      </section>
      <section className="flex gap-12">
        <BarChartSingle />
        <LineChartMultiple />
      </section>
      <section className="flex gap-12">
        <PieChartDonut />
        <CalendarDemo />
      </section>
    </div>
  );
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
