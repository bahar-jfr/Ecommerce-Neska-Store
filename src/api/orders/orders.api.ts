import { api } from "@/api/api.config";

export async function getOrders(/* {page =1}:{page?:number} */) {
  const res = await api.get(`/orders`);
  console.log(res.data)
  return res.data;
}
