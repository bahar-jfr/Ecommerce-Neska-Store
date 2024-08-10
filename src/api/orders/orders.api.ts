import { api } from "@/api/api.config";
import { IAddOrder, IParams } from "@/types";

export async function getOrders(params?: IParams) {
  const paramsObject: any = {};

  if (params?.limit) paramsObject.limit = params.limit;
  if (params?.page) paramsObject.page = params.page;
  if (params?.sort) paramsObject.sort = params.sort;

  const res = await api.get(`/orders`, { params: paramsObject });
  return res.data;
}

export async function getOrderById(id: string) {
  const res = await api.get(`/orders/${id}`);
  return res.data;
}

export async function addOrder(data: IAddOrder) {
  const res = await api.post("/orders", data);
  return res.data;
}

export function deleteOrder({ id }: { id: string }) {
  return api.delete(`/orders/${id}`);
}

export async function editOrder({
  id,
  data,
}: {
  id: string;
  data: Partial<Pick<IAddOrder, "deliveryStatus">>;
}) {
  const res = await api.patch(`/orders/${id}`, data);
  return res.data;
}
