import { api } from "@/api/api.config";
import { IProduct } from "@/types";

export async function getProducts() {
  const res = await api.get("/products");
  return res.data;
}

export async function editProduct(product: Partial<IProduct>) {
  const { _id, ...rest } = product;
  return await api.patch(`/products/${_id}`, rest);
}

export async function editMultiProduct(array: Partial<IProduct>[]) {
  const promiseArray = array.map((item) => editProduct(item));
  const res = await Promise.all(promiseArray);
  return res;
}
