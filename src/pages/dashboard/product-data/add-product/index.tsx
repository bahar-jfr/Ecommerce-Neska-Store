import { AdminLayout } from "@/components/layouts/admin/Layout";
import AddProductForm from "@/components/product-data/add-product/Form";
import { pageLevelLocalization } from "@/constants/localization";
import { ReactElement } from "react";

export default function AddProductPage() {
  return (
    <div className="px-24 flex flex-col gap-12 text-primary-foreground bg-secondary pt-12 pb-24 min-h-screen">
      <h1 className="text-2xl font-semibold ">
        {pageLevelLocalization.productsData.addProduct}
      </h1>
      <AddProductForm />
    </div>
  );
}

AddProductPage.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
  };