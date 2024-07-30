import { useQuery } from "@tanstack/react-query";
import { getOrders } from "./orders.api";

export function useGetOrders() {
  return useQuery({ queryKey: ["orders"], queryFn: getOrders });
}
