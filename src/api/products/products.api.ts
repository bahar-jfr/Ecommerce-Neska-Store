import { api } from "@/api/api.config";
import { toast } from "@/components/ui/use-toast";
import { pageLevelLocalization } from "@/constants/localization";
import { IAddProduct, IParams, IProduct } from "@/types";

enum EToastVariant {
  Success = "success",
  Destructive = "destructive",
  Default = "default",
}



export async function getProducts(params?:IParams) {
  const paramsObject: any = {};

  if (params?.limit) paramsObject.page = params.limit;
  if (params?.page) paramsObject.page = params.page;
  if (params?.brand) paramsObject.brand = params.brand;
  if (params?.category) paramsObject.category = params.category;
  if (params?.subcategory) paramsObject.subcategory = params.subcategory;
  if (params?.discount) paramsObject.discount = { ["gte"]: params.discount };
  if (params?.minPrice)
    paramsObject.price = { ...paramsObject.price, ["gte"]: params.minPrice };
  if (params?.maxPrice)
    paramsObject.price = { ...paramsObject.price, ["lt"]: params.maxPrice };
  if (params?.sort) paramsObject.sort = params.sort;

  const res = await api.get(`/products`, { params: paramsObject });
  return res.data;
}

export async function getProductsByParams(params?: string) {
  const res = await api.get(`/products${params}`);
  return res.data;
}

export async function getProductById(id: string) {
  const res = await api.get(`/products/${id}`);
  return res.data;
}

export async function addProduct(data: IAddProduct) {
  let toastItems = {
    message: `${pageLevelLocalization.productsData.successAdd}`,
    color: EToastVariant.Success,
  };

  const res = await api.post("/products", data);

  if (
    res.data.status === "fail" &&
    res.data.message ===
      "product name is already exists. choose a different product name"
  ) {
    toastItems.message = `${pageLevelLocalization.productsData.errorAnotherName}`;
    toastItems.color = EToastVariant.Destructive;
    toast({
      variant: `${toastItems.color}`,
      title: toastItems.message,
    });
  } else {
    toast({
      variant: `${toastItems.color}`,
      title: toastItems.message,
    });
  }

  return res.data;
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
