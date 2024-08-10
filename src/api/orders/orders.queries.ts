import {
  addOrder,
  deleteOrder,
  editOrder,
  getOrders,
} from "@/api/orders/orders.api";
import { IParams } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetOrders(params?: IParams) {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => getOrders(params),
  });
}

export function useAddOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addOrder"],
    mutationFn: addOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteOrder"],
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useEditOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editOrder"],
    mutationFn: editOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
