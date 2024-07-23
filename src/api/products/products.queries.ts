import { useQuery } from "@tanstack/react-query";
import { getProductById, getProducts } from "./products.api";

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
}

export function useGetProductById(id: string) {
  return useQuery({
    queryKey: ["singleProduct"],
    queryFn: () => getProductById(id),
  });
}
