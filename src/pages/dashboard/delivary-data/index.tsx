import { RadioDelivaryStatus } from "@/components/delivary-data/Radio";
import TableDelivary from "@/components/delivary-data/Table";
import { AdminLayout } from "@/components/layouts/admin/Layout";
import { pageLevelLocalization } from "@/constants/localization";
import { ReactElement } from "react";

export default function DelivaryDataPage() {
  return (
    <div className="px-24 flex flex-col gap-4  pt-12 pb-24 bg-secondary min-h-screen">
      <h1 className="text-2xl font-semibold text-primary-foreground">
        {pageLevelLocalization.delivary.manageOrders}
      </h1>
      <div className="flex flex-col gap-6">
        <RadioDelivaryStatus />
        <TableDelivary />
      </div>
    </div>
  );
}

DelivaryDataPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
