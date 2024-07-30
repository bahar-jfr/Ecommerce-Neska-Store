import { AdminLayout } from "@/components/layouts/admin/Layout";
import TableProduct from "@/components/product-data/Table";
import { pageLevelLocalization } from "@/constants/localization";
import { ReactElement } from "react";

export default function ProductDataPage() {
  return (
    <div className="px-24 flex flex-col text-primary-foreground bg-secondary pt-12 pb-24 min-h-screen">
    <h1 className="text-2xl font-semibold ">
         {pageLevelLocalization.productsData.manageProducts}
         </h1>
      <TableProduct />
    </div>
  );
}


ProductDataPage.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
  };