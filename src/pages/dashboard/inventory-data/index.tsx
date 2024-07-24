import TableInventory from "@/components/inventory-data/Table";
import { AdminLayout } from "@/components/layouts/admin/Layout";
import { pageLevelLocalization } from "@/constants/localization";
import { ReactElement } from "react";

export default function InventoryDataPage() {
  return (
    <div className="px-24 flex flex-col pt-12 pb-24 bg-secondary min-h-screen">
      <h1 className="text-2xl font-semibold text-primary-foreground">
        {pageLevelLocalization.inventory.manageInventory}
      </h1>

      <TableInventory />
    </div>
  );
}

InventoryDataPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
