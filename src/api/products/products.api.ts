import { api } from "@/api/api.config";

export async function getProducts() {
  const res = await api.get("/products");
  return res.data;
}

export async function getProductById(id: string) {
  const res = await api.get(`/products/${id}`);
  return res.data
}
