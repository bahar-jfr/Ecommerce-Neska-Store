import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editMultiProduct, getProducts } from "./products.api";
import { IProduct } from "@/types";

export function useGetProducts() {
  return useQuery({ queryKey: ["products"], queryFn: getProducts });
}

export function useEditMultiProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["editProducts"],
    mutationFn: editMultiProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }, 
  });
}
