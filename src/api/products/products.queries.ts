import {
  addProduct,
  deleteProduct,
  editMultiProduct,
  editProduct,
  getProducts,
  getProductById
} from "@/api/products/products.api";
import { useToast } from "@/components/ui/use-toast";
import { pageLevelLocalization } from "@/constants/localization";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export function useGetProductById(id: string) {
  return useQuery({
    queryKey: ["singleProduct"],
    queryFn: () => getProductById(id),
  })}




export function useGetProducts() {
  return useQuery({ queryKey: ["products"], queryFn: getProducts });
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

export function useEditProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editProduct"],
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });

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
