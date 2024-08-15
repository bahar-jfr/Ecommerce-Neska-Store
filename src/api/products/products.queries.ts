import {
  addProduct,
  deleteProduct,
  editMultiProduct,
  editProduct,
  editProductImage,
  getProductById,
  getProducts,
} from "@/api/products/products.api";
import { useToast } from "@/components/ui/use-toast";
import { pageLevelLocalization } from "@/constants/localization";
import { IParams } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetProductById(id: string) {
  return useQuery({
    queryKey: ["singleProduct", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
}

export function useGetProducts(params: IParams ={}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
}

export function useAddProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addProduct"],
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useEditProductImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editProductImage"],
    mutationFn: editProductImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useEditProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editProduct"],
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["singleProduct"] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useEditMultiProduct() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["editProducts"],
    mutationFn: editMultiProduct,
    onSuccess: () => {
      toast({
        variant: "success",
        title: `${pageLevelLocalization.inventory.success}`,
      });

      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: `${pageLevelLocalization.inventory.error}`,
      });
    },
  });
}
