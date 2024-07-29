import { api } from "@/api/api.config";
import { toast } from "@/components/ui/use-toast";
import { pageLevelLocalization } from "@/constants/localization";
import { IAddProduct, IProduct } from "@/types";

export async function getProducts() {
  const res = await api.get("/products");
  return res.data;
}

export async function addProduct(data: IAddProduct) {
  const res = await api.post("/products", data);
  return res;
}

export async function deleteProduct(id: string) {
  return api.delete(`/products/${id}`);
}

export async function editProduct(
  product:
    | Partial<IProduct>
    | {
        _id: string;
        name: string;
        description: string;
        subcategory: string;
        category: string;
      }
) {
  const { _id, ...rest } = product;

  enum EToastVariant {
    Success = "success",
    Destructive = "destructive",
    Default = "default",
  }
  
  let toastItems = {
    message: `${pageLevelLocalization.productsData.success}`,
    color: EToastVariant.Success,
  };

  const res = await api.patch(`/products/${_id}`, rest);

  if (
    res.data.status === "fail" &&
    res.data.message ===
      "product name is already exists. choose a different product name"
  ) {
    toastItems.message = `${pageLevelLocalization.productsData.errorAnotherName}`;
    toastItems.color = EToastVariant.Destructive;
  }

  toast({
    variant: `${toastItems.color}`,
    title: toastItems.message,
  });

  return res.data;
}

export async function editMultiProduct(array: Partial<IProduct>[]) {
  const promiseArray = array.map((item) => editProduct(item));
  const res = await Promise.all(promiseArray);
  return res;
}
